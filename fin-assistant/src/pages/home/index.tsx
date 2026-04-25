import { useEffect, useState } from "react";
import type { Goal } from "../../entities/goal/model/types";
import { getGoals } from "../../entities/goal/model/repository";
import { addIncomeService } from "../../entities/income/model/service";
export const HomePage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getGoals();
        setGoals(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!goals.length) {
    return <div>No goals yet</div>;
  }

  return (
    <div>
      <h1>Home</h1>

      <button
        onClick={async () => {
          await addIncomeService(10000);
          window.location.reload();
        }}
      >
        TEST: Add 10k income
      </button>

      {goals.map((goal) => (
        <div key={goal.id}>
          <h3>
            {goal.emoji} {goal.title}
          </h3>

          <p>
            {goal.currentAmount} / {goal.targetAmount}
          </p>

          <p>{goal.incomePercent}% income</p>

          <p>
            {Math.round(
              (goal.currentAmount / goal.targetAmount) * 100
            )}
            %
          </p>
        </div>
      ))}
    </div>
  );
};