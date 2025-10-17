# analysis/balance_index_calculation.py
"""
Legacy-compatible Balance Index pipeline (matches old repo API/naming).

Key functions kept for backwards-compatibility:
- compute_balance_index(df, scale_percent=True)
- add_categories(df, cuts=(0.05, 0.15, 0.30))
- summarize_latest(df, year_col="year")
- run(in_panel="outputs/panel_final.csv", outdir="outputs/derived")

Outputs (names kept close to legacy):
- outputs/derived/balance_index_complete.csv   # latest by country (ranked)
- outputs/derived/panel_with_bi.csv            # full panel with BI & category
- outputs/derived/bi_summary.json              # manuscript stats & r with employment
"""

from __future__ import annotations
import json
from pathlib import Path
import numpy as np
import pandas as pd


CUTS = (0.05, 0.15, 0.30)
CAT_LABELS = ["Optimal", "Moderate", "High", "Severe"]


def _to_01(s: pd.Series) -> pd.Series:
    s = pd.to_numeric(s, errors="coerce")
    return s / 100.0 if s.max(skipna=True) > 1 else s


def compute_balance_index(df: pd.DataFrame, scale_percent: bool = True) -> pd.DataFrame:
    if not {"p_STEM", "p_HSS"}.issubset(df.columns):
        raise ValueError("columns p_STEM & p_HSS required")
    stem = _to_01(df["p_STEM"]) if scale_percent else pd.to_numeric(df["p_STEM"], errors="coerce")
    hss  = _to_01(df["p_HSS"])  if scale_percent else pd.to_numeric(df["p_HSS"],  errors="coerce")
    out = df.copy()
    out["p_STEM_norm"] = stem
    out["p_HSS_norm"]  = hss
    out["BI"] = (stem - hss).abs()     # NOTE: percentage-point diff (no /100)
    return out


def add_categories(df: pd.DataFrame, cuts=CUTS) -> pd.DataFrame:
    bins = [-np.inf, cuts[0], cuts[1], cuts[2], np.inf]
    out = df.copy()
    out["balance_category"] = pd.cut(out["BI"], bins=bins, labels=CAT_LABELS, right=False)
    return out


def _latest(df: pd.DataFrame, year_col="year") -> pd.DataFrame:
    df2 = df.dropna(subset=["country", year_col]).sort_values([ "country", year_col])
    return df2[df2.groupby("country")[year_col].transform("max") == df2[year_col]].copy()


def summarize_latest(df_latest: pd.DataFrame) -> dict:
    bi = pd.to_numeric(df_latest["BI"], errors="coerce").dropna()
    summary = {
        "bi_mean": float(bi.mean()),
        "bi_sd": float(bi.std(ddof=1)) if len(bi) > 1 else None,
        "bi_min": float(bi.min()) if len(bi) else None,
        "bi_max": float(bi.max()) if len(bi) else None,
        "n_countries": int(df_latest["country"].nunique()),
        "category_cuts": CUTS,
        "category_labels": CAT_LABELS,
    }
    # Employment correlation (legacy expects this if present)
    if "emp_25_34" in df_latest.columns:
        emp = pd.to_numeric(df_latest["emp_25_34"], errors="coerce")
        mask = emp.notna() & df_latest["BI"].notna()
        if mask.sum() >= 3:
            r = float(np.corrcoef(df_latest.loc[mask, "BI"], emp[mask])[0, 1])
            summary.update({"employment_r": r, "employment_r2": r**2, "employment_n": int(mask.sum())})
    return summary


def run(in_panel="outputs/panel_final.csv", outdir="outputs/derived"):
    outdir = Path(outdir); outdir.mkdir(parents=True, exist_ok=True)
    df = pd.read_csv(in_panel)
    df_bi = add_categories(compute_balance_index(df, scale_percent=True))

    # full panel
    panel_path = outdir / "panel_with_bi.csv"
    df_bi.to_csv(panel_path, index=False)

    # latest by country (legacy name close to old repo)
    latest = _latest(df_bi).sort_values("BI").reset_index(drop=True)
    complete_path = outdir / "balance_index_complete.csv"
    latest.to_csv(complete_path, index=False)

    # summary
    summary = summarize_latest(latest)
    (outdir / "bi_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

    return {
        "panel_with_bi": str(panel_path),
        "balance_index_complete": str(complete_path),
        "summary_json": str(outdir / "bi_summary.json"),
    }


if __name__ == "__main__":
    paths = run()
    print("[OK] wrote:", paths)
