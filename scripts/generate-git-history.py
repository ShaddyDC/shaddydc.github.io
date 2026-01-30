#!/usr/bin/env python3
"""Generate git history data for Hugo content files.

Walks all .md files under shaddy.dev/content/, runs git log for each,
and writes a JSON map to shaddy.dev/data/githistory.json keyed by the
file path relative to the content directory.
"""

import json
import os
import subprocess
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(REPO_ROOT, "shaddy.dev", "content")
OUTPUT_FILE = os.path.join(REPO_ROOT, "shaddy.dev", "data", "githistory.json")

SEPARATOR = "---GIT-HISTORY-SEP---"
LOG_FORMAT = f"%H%n%ai%n%s%n{SEPARATOR}"


def get_history(filepath):
    result = subprocess.run(
        ["git", "log", f"--format={LOG_FORMAT}", "--follow", "--", filepath],
        capture_output=True,
        text=True,
        cwd=REPO_ROOT,
    )
    if result.returncode != 0 or not result.stdout.strip():
        return []

    commits = []
    lines = result.stdout.strip().split("\n")
    i = 0
    while i + 2 < len(lines):
        commits.append(
            {
                "hash": lines[i],
                "date": lines[i + 1],
                "subject": lines[i + 2],
            }
        )
        i += 4  # hash, date, subject, separator
    return commits


def main():
    result = {}
    for root, _dirs, files in os.walk(CONTENT_DIR):
        for f in files:
            if not f.endswith(".md"):
                continue
            filepath = os.path.join(root, f)
            rel_path = os.path.relpath(filepath, CONTENT_DIR)

            commits = get_history(filepath)
            if commits:
                result[rel_path] = commits

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w") as out:
        json.dump(result, out, indent=2)

    print(f"Generated git history for {len(result)} files -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
