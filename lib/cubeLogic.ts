import { WCAEvent } from "./types";

export type Color = 'white' | 'yellow' | 'orange' | 'red' | 'green' | 'blue';

export type CubeState = {
  U: Color[][];
  D: Color[][];
  L: Color[][];
  R: Color[][];
  F: Color[][];
  B: Color[][];
};

const createFace = (color: Color): Color[][] => [
  [color, color, color],
  [color, color, color],
  [color, color, color],
];

export const getInitialState = (): CubeState => ({
  U: createFace('white'),
  D: createFace('yellow'),
  L: createFace('orange'),
  R: createFace('red'),
  F: createFace('green'),
  B: createFace('blue'),
});

const rotateFaceClockwise = (face: Color[][]) => {
  const newFace = createFace(face[0][0]);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      newFace[c][2 - r] = face[r][c];
    }
  }
  return newFace;
};

export const applyMove = (state: CubeState, move: string): CubeState => {
  const newState = JSON.parse(JSON.stringify(state)) as CubeState;
  const baseMove = move[0];
  const isPrime = move.includes("'");
  const isDouble = move.includes("2");
  const count = isDouble ? 2 : isPrime ? 3 : 1;

  for (let i = 0; i < count; i++) {
    const s = JSON.parse(JSON.stringify(newState)) as CubeState;
    switch (baseMove) {
      case 'U':
        newState.U = rotateFaceClockwise(s.U);
        newState.F[0] = [...s.R[0]];
        newState.R[0] = [...s.B[0]];
        newState.B[0] = [...s.L[0]];
        newState.L[0] = [...s.F[0]];
        break;
      case 'D':
        newState.D = rotateFaceClockwise(s.D);
        newState.F[2] = [...s.L[2]];
        newState.L[2] = [...s.B[2]];
        newState.B[2] = [...s.R[2]];
        newState.R[2] = [...s.F[2]];
        break;
      case 'L':
        newState.L = rotateFaceClockwise(s.L);
        for (let j = 0; j < 3; j++) {
          newState.F[j][0] = s.U[j][0];
          newState.U[j][0] = s.B[2 - j][2];
          newState.B[j][2] = s.D[2 - j][0];
          newState.D[j][0] = s.F[j][0];
        }
        break;
      case 'R':
        newState.R = rotateFaceClockwise(s.R);
        for (let j = 0; j < 3; j++) {
          newState.F[j][2] = s.D[j][2];
          newState.D[j][2] = s.B[2 - j][0];
          newState.B[j][0] = s.U[2 - j][2];
          newState.U[j][2] = s.F[j][2];
        }
        break;
      case 'F':
        newState.F = rotateFaceClockwise(s.F);
        for (let j = 0; j < 3; j++) {
          newState.U[2][j] = s.L[2 - j][2];
          newState.R[j][0] = s.U[2][j];
          newState.D[0][j] = s.R[2 - j][0];
          newState.L[j][2] = s.D[0][j];
        }
        break;
      case 'B':
        newState.B = rotateFaceClockwise(s.B);
        for (let j = 0; j < 3; j++) {
          newState.U[0][j] = s.R[j][2];
          newState.L[j][0] = s.U[0][2 - j];
          newState.D[2][j] = s.L[j][0];
          newState.R[j][2] = s.D[2][2 - j];
        }
        break;
    }
    if (i < count - 1) Object.assign(s, newState);
  }

  return newState;
};

export const getScrambledState = (scramble: string): CubeState => {
  let state = getInitialState();
  const moves = scramble.split(' ').filter(m => m.length > 0);
  for (const move of moves) {
    state = applyMove(state, move);
  }
  return state;
};
export const generateScramble = (event: WCAEvent = "3x3x3") => {
  const movesByEvent: Record<string, string[]> = {
    "2x2x2": ["U", "R", "F"],
    "3x3x3": ["U", "D", "L", "R", "F", "B"],
    "4x4x4": ["U", "D", "L", "R", "F", "B", "Uw", "Dw", "Lw", "Rw", "Fw", "Bw"],
    "5x5x5": ["U", "D", "L", "R", "F", "B", "Uw", "Dw", "Lw", "Rw", "Fw", "Bw"],
    "OH": ["U", "D", "L", "R", "F", "B"],
    "3BLD": ["U", "D", "L", "R", "F", "B"],
  };

  const lengthsByEvent: Record<string, number> = {
    "2x2x2": 9,
    "3x3x3": 21,
    "4x4x4": 40,
    "5x5x5": 60,
    "OH": 21,
    "3BLD": 21,
    "Megaminx": 70,
    "Pyraminx": 11,
    "Skewb": 9,
    "Square-1": 12,
  };

  const moves = movesByEvent[event] || movesByEvent["3x3x3"];
  const length = lengthsByEvent[event] || 21;
  
  if (event === "Megaminx") {
    const megaminxMoves = ["R++", "R--", "D++", "D--"];
    const scramble = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 10; j++) {
        const move = megaminxMoves[Math.floor(Math.random() * 4)];
        scramble.push(move);
      }
      scramble.push(Math.random() > 0.5 ? "U" : "U'");
    }
    return scramble.join(" ");
  }

  if (event === "Pyraminx") {
    const pyraMoves = ["U", "L", "R", "B"];
    const pyraTips = ["u", "l", "r", "b"];
    const scramble = [];
    let lastMove = "";
    for (let i = 0; i < 8; i++) {
      let move = pyraMoves[Math.floor(Math.random() * 4)];
      while (move === lastMove) move = pyraMoves[Math.floor(Math.random() * 4)];
      scramble.push(move + (Math.random() > 0.5 ? "" : "'"));
      lastMove = move;
    }
    pyraTips.forEach(tip => {
      if (Math.random() > 0.3) {
        scramble.push(tip + (Math.random() > 0.5 ? "" : "'"));
      }
    });
    return scramble.join(" ");
  }

  const modifiers = ["", "'", "2"];
  const scrambleMoves = [];
  let lastMove = "";

  for (let i = 0; i < length; i++) {
    let move = moves[Math.floor(Math.random() * moves.length)];
    while (move === lastMove) {
      move = moves[Math.floor(Math.random() * moves.length)];
    }
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scrambleMoves.push(move + modifier);
    lastMove = move;
  }

  return scrambleMoves.join(" ");
};
