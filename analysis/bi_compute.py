# analysis/bi_compute.py
"""
Thin CLI entry for the Balance Index pipeline (legacy compatible).
Runs the pipeline on outputs/panel_final.csv and writes to outputs/derived/.
"""

from balance_index_calculation import run

if __name__ == "__main__":
    paths = run(in_panel="outputs/panel_final.csv", outdir="outputs/derived")
    print(paths)
