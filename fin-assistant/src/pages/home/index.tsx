import { useEffect, useState } from "react";
import { logoutUser } from "../../app/providers/auth";
import { getGoals } from "../../entities/goal/model/repository";
import type { Goal } from "../../entities/goal/model/types";
import { addIncomeService } from "../../entities/income/model/service";
import { Button } from "../../shared/ui/Button/Button";
import { GoalCard } from "../../widgets/GoalCard";
import { KanyeQuote } from "../../widgets/KanyeQuote";
import styles from "./home.module.css"
import { BottomSheet } from "../../shared/ui/BottomSheet/BottomSheet";
import { CreateGoalPage } from "../create-goal";

export const HomePage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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
    <div className="container">
      <h1>Home</h1>

      <KanyeQuote />

      <section className={styles.sectionGoals}>
        {goals.map((goal) => (
          <GoalCard
            currentAmount={goal.currentAmount}
            emoji={goal.emoji}
            incomePercent={goal.incomePercent}
            title={goal.title}
            type="goal"
            targetAmount={goal.targetAmount}
            key={goal.id}
          />
        ))}
      </section>

      <button
        onClick={async () => {
          await addIncomeService(10000);
          window.location.reload();
        }}
      >
        TEST: Add 10k income
      </button>

      <Button onClick={() => setOpen(true)}>
        Создать цель
      </Button>




      <Button className="smallButtonWhite" onClick={logoutUser}>
        Выйти из аккаунта
      </Button>


      <div className="container">
        <BottomSheet isOpen={open} onClose={() => setOpen(false)}>
          <CreateGoalPage />
        </BottomSheet>
      </div>
    </div>
  );
};