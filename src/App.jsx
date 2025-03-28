import React, { useState, useEffect } from "react";
import "./App.css"; // Asegúrate de tener un archivo CSS para estilos
import { db } from "./firebaseConfig"; // Importa la configuración de Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function App() {
  const [score, setScore] = useState(0);
  const [size, setSize] = useState(80);
  const [time, setTime] = useState(2000);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const randomPosition = () => {
    return {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    };
  };

  const handleHit = () => {
    setScore((prevScore) => prevScore + 1);
    setSize((prevSize) => Math.max(prevSize * 0.9, 20)); // Reducir tamaño, mínimo 20px
    setTime((prevTime) => Math.max(prevTime * 0.9, 500)); // Reducir tiempo, mínimo 500ms
    setPosition(randomPosition());
  };

  const handleMiss = async () => {
    if (score > 0) {
      try {
        await addDoc(collection(db, "scores"), {
          score: score,
          timestamp: serverTimestamp(),
        });
        console.log("Puntaje guardado:", score);
      } catch (error) {
        console.error("Error al guardar el puntaje:", error);
      }
    }

    alert(`Game Over! Puntaje final: ${score}`);
    resetGame();
  };

  const resetGame = () => {
    setScore(0);
    setSize(80);
    setTime(2000);
    setPosition(randomPosition());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleMiss();
    }, time);
    return () => clearTimeout(timer);
  }, [position, time]);

  return (
    <div className="game-container" onClick={handleMiss}>
      <h1 className="score">Score: {score}</h1>
      <div
        className="target"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: position.top,
          left: position.left,
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleHit();
        }}
      />
    </div>
  );
}
