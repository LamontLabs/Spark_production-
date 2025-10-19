#!/usr/bin/env bash
set -e
command -v node >/dev/null || (echo "node missing" && exit 1)
command -v npm >/dev/null || (echo "npm missing" && exit 1)
command -v python3 >/dev/null || (echo "python3 missing" && exit 1)
echo "env ok"
