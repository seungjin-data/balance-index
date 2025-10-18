# analysis/bi_utils.py
import pandas as pd

def compute_bi(row):
    """Balance Index (BI) = |STEM% - HSS%| (no division by 100)."""
    return abs(row["p_STEM"] - row["p_HSS"])

def categorize_bi(bi):
    if bi < 0.05:  return "Optimal"
    if bi < 0.15:  return "Moderate"
    if bi < 0.30:  return "High"
    return "Severe"
