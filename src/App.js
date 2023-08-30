import "./App.css";
import { useState, useRef } from "react";

const crosswordPuzzles = [
  {
    question:
      "A quoi correspond ce numéro atomique 57 dans la table de Mendeleïev ?",
    answer: "Lanthane",
    key: "1",
  },
  {
    question: "Communement utilisé pour tuer les insectes.",
    answer: "Insecticide",
    key: "2",
  },
  {
    question:
      "Une de ces appellations est eau-de-vie (fine) de vin qui est produite en France. Qu'elle est son nom le plus commun ?",
    answer: "Cognac",
    key: "3",
  },
  {
    question:
      "Dans Harry Potter, comment s'appelle le sort qui permet de faire tout oublier à quelqu'un ?",
    answer: "Oubliette",
    key: "4",
  },
  {
    question: "Fruit de la vigne",
    answer: "Raisin",
    key: "5",
  },
  {
    question:
      "Mon drapeau est composé de trois nuances : le rouge, le bleu et le blanc",
    answer: "Norvege",
    key: "6",
  },
  {
    question: "Marque de cigarette commencant par E",
    answer: "Elixyr",
    key: "7",
  },
];

const App = () => {
  const inputRef = useRef([]);
  const [allAnswers, setAllAnswers] = useState(
    crosswordPuzzles.map((crossword) => ({
      values: Array.from({ length: crossword.answer.length }, () => ""),
      key: crossword.key,
      isCorrect: false,
    }))
  );

  const handleChange = (value, index, indexOfAnswer, j) => {
    const newAllAnswers = [...allAnswers];
    const answer = newAllAnswers[indexOfAnswer];
    answer.values[j] = value.slice(-1);
    const findCrossWord = crosswordPuzzles.find(
      (item) => item.key === answer.key
    );
    if (findCrossWord) {
      const fullAnswer = answer.values.join("");
      if (fullAnswer.toLowerCase() === findCrossWord.answer.toLowerCase()) {
        answer.isCorrect = true;
      }
    }
    if (value.length === 0 && j > 0) {
      const previous = inputRef.current[index - 1];
      if (previous) {
        previous.focus();
      }
    } else if (answer.values.length > j + 1 && value.length > 0) {
      const next = inputRef.current[index + 1];
      if (next) {
        next.focus();
      }
    }
    setAllAnswers(newAllAnswers);
  };

  return (
    <div style={{ padding: 16 }}>
      <div>
        {crosswordPuzzles.map((crossword, index, arr) => {
          const { key } = crossword;
          const findIndexOfAnswer = allAnswers.findIndex(
            (item) => item.key === key
          );
          if (findIndexOfAnswer < 0) {
            return undefined;
          }
          let indexRef = 0;
          if (index !== 0) {
            indexRef = arr
              .slice(0, index)
              .reduce((prev, curr) => prev + curr.answer.length, 0);
          }
          const answer = allAnswers[findIndexOfAnswer];
          return (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <p>{`${index + 1})`}</p>
              {answer.values.map((value, j) => (
                <input
                  key={j}
                  ref={(el) => (inputRef.current[indexRef + j] = el)}
                  style={{
                    width: 15,
                    height: 15,
                    margin: 4,
                    border: `1px solid ${answer.isCorrect ? "green" : "black"}`,
                    borderRadius: 4,
                    textAlign: "center",
                  }}
                  value={value}
                  onChange={(e) =>
                    !answer.isCorrect &&
                    handleChange(
                      e.target.value,
                      indexRef + j,
                      findIndexOfAnswer,
                      j
                    )
                  }
                />
              ))}
            </div>
          );
        })}
      </div>
      {allAnswers.every((item) => item.isCorrect) ? (
        <div>
          Félicitations, tu viens de décoder le code. Il ne te reste plus qu'a
          trouver le nom secret et de le transmettre à ton référent par sms
          (+33642041916).
        </div>
      ) : (
        <div>
          <p>Mettre les réponses sans accents.</p>
          {crosswordPuzzles.map((crossword, index) => {
            const { question } = crossword;
            return (
              <div key={index}>
                <p>{`${index + 1}) ${question}`}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
