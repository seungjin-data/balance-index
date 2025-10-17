# analysis/bi_compute.py
from balance_index_calculation import run

if __name__ == "__main__":
    out = run(in_panel="outputs/panel_final.csv", outdir="outputs/derived")
    print(out)
