"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/*
 * A four by four sudoku for the page that is usually a dead end. The grid is
 * one fixed puzzle solvable with naked singles alone, so the page needs no
 * solver and never asks anyone to guess. Sendoku's two rules apply: a wrong
 * digit is marked the moment it is placed, and a hint names the reason.
 */

const N = 4;
const BOX = 2;

// prettier-ignore
const SOLUTION = [
  1, 2, 3, 4,
  3, 4, 1, 2,
  2, 1, 4, 3,
  4, 3, 2, 1,
];

// prettier-ignore
const GIVENS = [
  1, 0, 0, 4,
  0, 4, 0, 2,
  0, 0, 4, 0,
  4, 0, 0, 1,
];

export interface SudokuLabels {
  hint: string;
  doIt: string;
  erase: string;
  hintSingle: string;
  hintWrong: string;
  hintNone: string;
  solved: string;
  solvedAction: string;
  action: string;
  boardLabel: string;
  cellLabel: string;
}

const row = (i: number) => Math.floor(i / N);
const col = (i: number) => i % N;
const box = (i: number) =>
  Math.floor(row(i) / BOX) * BOX + Math.floor(col(i) / BOX);

/** Cell index of position `p` inside box `b`, both read row by row. */
const cellOf = (b: number, p: number) =>
  (Math.floor(b / BOX) * BOX + Math.floor(p / BOX)) * N +
  ((b % BOX) * BOX + (p % BOX));

/** Every other cell that shares a row, column, or box with `i`. */
function peers(i: number): number[] {
  const out: number[] = [];
  for (let j = 0; j < N * N; j++) {
    if (j === i) continue;
    if (row(j) === row(i) || col(j) === col(i) || box(j) === box(i)) out.push(j);
  }
  return out;
}

function candidates(board: number[], i: number): number[] {
  const used = new Set(peers(i).map((j) => board[j]));
  const out: number[] = [];
  for (let d = 1; d <= N; d++) if (!used.has(d)) out.push(d);
  return out;
}

type Hint =
  | { kind: "single"; cell: number; digit: number; peers: number[] }
  | { kind: "wrong"; cell: number }
  | { kind: "none" };

function findHint(board: number[]): Hint {
  // A wrong digit poisons every deduction after it, so it comes first.
  const wrong = board.findIndex((d, i) => d !== 0 && d !== SOLUTION[i]);
  if (wrong !== -1) return { kind: "wrong", cell: wrong };

  for (let i = 0; i < N * N; i++) {
    if (board[i] !== 0) continue;
    const c = candidates(board, i);
    if (c.length === 1) {
      // The cells the argument rests on: peers holding the excluded digits.
      const reason = peers(i).filter((j) => board[j] !== 0);
      return { kind: "single", cell: i, digit: c[0], peers: reason };
    }
  }
  return { kind: "none" };
}

export default function Sudoku404({ labels }: { labels: SudokuLabels }) {
  const [board, setBoard] = useState<number[]>(GIVENS);
  const [selected, setSelected] = useState<number | null>(null);
  const [hint, setHint] = useState<Hint | null>(null);
  const cells = useRef<(HTMLButtonElement | null)[]>([]);

  const solved = board.every((d, i) => d === SOLUTION[i]);

  const place = (digit: number) => {
    if (selected === null || GIVENS[selected] !== 0) return;
    setBoard((b) => {
      const next = [...b];
      next[selected] = digit;
      return next;
    });
    setHint(null);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (selected === null) return;
    const key = e.key;
    if (/^[1-4]$/.test(key)) {
      e.preventDefault();
      place(Number(key));
      return;
    }
    if (key === "Backspace" || key === "Delete" || key === "0") {
      e.preventDefault();
      place(0);
      return;
    }
    const delta: Record<string, number> = {
      ArrowUp: -N,
      ArrowDown: N,
      ArrowLeft: -1,
      ArrowRight: 1,
    };
    if (key in delta) {
      e.preventDefault();
      const next = (selected + delta[key] + N * N) % (N * N);
      setSelected(next);
      cells.current[next]?.focus();
    }
  };

  // The hint selects the cell it talks about, so "Do it" has a target.
  useEffect(() => {
    if (hint && hint.kind !== "none") setSelected(hint.cell);
  }, [hint]);

  const askHint = () => setHint(findHint(board));

  const applyHint = () => {
    if (!hint) return;
    if (hint.kind === "single") {
      setBoard((b) => {
        const next = [...b];
        next[hint.cell] = hint.digit;
        return next;
      });
    } else if (hint.kind === "wrong") {
      setBoard((b) => {
        const next = [...b];
        next[hint.cell] = 0;
        return next;
      });
    }
    setHint(null);
  };

  const hintPeers = new Set(hint?.kind === "single" ? hint.peers : []);
  const hintText =
    hint === null
      ? ""
      : hint.kind === "single"
        ? labels.hintSingle.replace("{{digit}}", String(hint.digit))
        : hint.kind === "wrong"
          ? labels.hintWrong
          : labels.hintNone;

  const renderCell = (i: number) => {
    const digit = board[i];
    const given = GIVENS[i] !== 0;
    const wrong = digit !== 0 && digit !== SOLUTION[i];
    const isSel = selected === i;
    const related =
      selected !== null &&
      !isSel &&
      (row(i) === row(selected) ||
        col(i) === col(selected) ||
        box(i) === box(selected));
    const classes = [
      "sudoku-cell",
      given ? "is-given" : "",
      wrong ? "is-wrong" : "",
      isSel ? "is-selected" : "",
      related ? "is-related" : "",
      hintPeers.has(i) ? "is-reason" : "",
      hint?.kind === "single" && hint.cell === i ? "is-target" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <button
        key={i}
        ref={(el) => {
          cells.current[i] = el;
        }}
        type="button"
        role="gridcell"
        aria-selected={isSel}
        aria-label={labels.cellLabel
          .replace("{{row}}", String(row(i) + 1))
          .replace("{{col}}", String(col(i) + 1))}
        className={classes}
        onClick={() => setSelected(i)}
        onFocus={() => setSelected(i)}
        disabled={solved}
      >
        {digit !== 0 ? digit : ""}
      </button>
    );
  };

  return (
    <div className="sudoku">
      {/* Four two-by-two boxes, so the thicker box lines are a real gap. */}
      <div
        className="sudoku-board"
        role="grid"
        aria-label={labels.boardLabel}
        onKeyDown={onKey}
      >
        {[0, 1, 2, 3].map((b) => (
          <div key={b} className="sudoku-box" role="presentation">
            {[0, 1, 2, 3].map((p) => renderCell(cellOf(b, p)))}
          </div>
        ))}
      </div>

      {solved ? (
        <div className="sudoku-side">
          <p className="text-body">{labels.solved}</p>
          <Link href="/" className="button primary mt-3">
            {labels.solvedAction}
          </Link>
        </div>
      ) : (
        <div className="sudoku-side">
          <div className="sudoku-keys" aria-label="Digits">
            {[1, 2, 3, 4].map((d) => (
              <button
                key={d}
                type="button"
                className="sudoku-key"
                onClick={() => place(d)}
                disabled={selected === null || GIVENS[selected] !== 0}
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              className="sudoku-key is-erase"
              onClick={() => place(0)}
              disabled={selected === null || GIVENS[selected] !== 0}
            >
              {labels.erase}
            </button>
          </div>

          <div className="sudoku-actions">
            <Link href="/" className="button primary">
              {labels.action}
            </Link>
            <button type="button" className="sudoku-hint" onClick={askHint}>
              {labels.hint}
            </button>
          </div>

          {hint && (
            <p className="sudoku-hint-text" aria-live="polite">
              {hintText}
              {hint.kind !== "none" && (
                <>
                  {" "}
                  <button
                    type="button"
                    className="sudoku-hint"
                    onClick={applyHint}
                  >
                    {hint.kind === "single" ? labels.doIt : labels.erase}
                  </button>
                </>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
