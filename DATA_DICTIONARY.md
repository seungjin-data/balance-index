# DATA DICTIONARY

This document describes the datasets in the `outputs/` folder. All numbers are **aligned 1:1 with Manuscript v2 (journal submission)**.

---

## `panel_final.csv` — column definitions
| Column | Type | Unit/Format | Description |
|---|---|---|---|
| iso3 | string | ISO3 | Country code (e.g., KOR, USA) |
| country | string | — | Country name (English) |
| year | int | YYYY | Year (2015–2025) |
| p_STEM | float | % (0–100) | Share of graduates in STEM (Natural sciences, ICT, Engineering, Agriculture) |
| p_HSS | float | % (0–100) | Share of graduates in HSS (Education, Humanities & Arts, Social sciences, Business & Law) |
| p_OTHER | float | % (0–100) | Share of graduates in Health/Welfare & Services |
| BI | float | 0–1 | **Balance Index = \|STEM% − HSS%\|** (percentage-point difference; **no division by 100**) |
| emp_25_34 | float | % | Employment rate, age 25–34 |
| unemp_25_34 | float | % | Unemployment rate, age 25–34 |
| neet_15_29 | float | % | NEET rate, age 15–29 (18–29 used as an alternative when applicable) |
| gdp_pc_ppp | float | USD PPP | GDP per capita (PPP) |
| internet_users_pct | float | % | Individuals using the internet |
| broadband_subs | float | per 100 | Fixed broadband subscriptions (per 100 people) |
| region | string | enum | World region (Europe, Asia, Americas, Africa, Oceania, …) |
| income_group | string | enum | World Bank income group (High/Upper-middle/Lower-middle/Low) |
| source | string | — | Data source/version label (e.g., “Manuscript v2”) |

> Note: `BI` is computed as a **percentage-point difference**; do **not** divide by 100.

---

## `balance_index_by_country_2015_2025.csv` — column definitions
| Column | Type | Description |
|---|---|---|
| country | string | Country name |
| iso3 | string | ISO3 code |
| year | int | Year (typically latest available year) |
| BI | float | Balance Index (0–1) |
| region | string | World region |
| income_group | string | World Bank income group |
| source | string | Source/version label (e.g., Manuscript v2) |

---

## `core_metrics.json` — key definitions
```json
{
  "definition": "BI = |STEM% - HSS%| (percentage-point difference; no division by 100)",
  "coverage": { "countries": 138, "years": "2015–2025" },
  "bi_stats": { "mean": 0.080, "sd": 0.089, "min": 0.001, "max": 0.557 },
  "employment_link": { "r": -0.72, "p_value": "<0.001", "r2": 0.518, "n": 92 },
  "balance_categories": [
    { "label": "Optimal", "range": "<0.05" },
    { "label": "Moderate", "range": "0.05–0.15" },
    { "label": "High", "range": "0.15–0.30" },
    { "label": "Severe", "range": "≥0.30" }
  ],
  "examples_top_balance": [
    { "country": "Grenada", "bi": 0.001 },
    { "country": "Luxembourg", "bi": 0.001 },
    { "country": "North Macedonia", "bi": 0.003 },
    { "country": "Kyrgyzstan", "bi": 0.003 },
    { "country": "Belize", "bi": 0.006 },
    { "country": "Norway", "bi": 0.006 }
  ],
  "examples_most_imbalanced": [
    { "country": "Bangladesh", "bi": 0.557 },
    { "country": "Myanmar", "bi": 0.334 },
    { "country": "Sudan", "bi": 0.322 },
    { "country": "Mauritania", "bi": 0.285 }
  ],
  "source_alignment": "Manuscript v2 (journal submission)"
}



