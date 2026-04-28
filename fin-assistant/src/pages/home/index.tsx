import { useState } from "react";
import { logoutUser } from "../../app/providers/auth";
import { useGoals } from "../../features/income/add/hooks/useGoals";
import { AddIncomeSheet } from "../../features/income/add/ui";
import { BottomSheet } from "../../shared/ui/BottomSheet/BottomSheet";
import { Button } from "../../shared/ui/Button/Button";
import { GoalCard } from "../../widgets/GoalCard";
import { KanyeQuote } from "../../widgets/KanyeQuote";
import { CreateGoalPage } from "../create-goal";
import styles from "./home.module.css";

export const HomePage = () => {
  const { goals, loading, refetch } = useGoals();
  const [isGoalOpen, setGoalOpen] = useState(false);
  const [isIncomeOpen, setIncomeOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!goals.length) {
    return <div>No goals yet
      <Button className="smallButtonWhite" onClick={logoutUser}>
        Выйти из аккаунта
      </Button>
      <Button onClick={() => setGoalOpen(true)}>
        Создать цель
      </Button>
      
      <BottomSheet isOpen={isGoalOpen} onClose={() => setGoalOpen(false)}>
        <CreateGoalPage />
      </BottomSheet>
      </div>;
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


      <Button onClick={() => setGoalOpen(true)}>
        Создать цель
      </Button>

      <Button onClick={() => setIncomeOpen(true)}>
        Add Income
      </Button>


      <Button className="smallButtonWhite" onClick={logoutUser}>
        Выйти из аккаунта
      </Button>


      <BottomSheet isOpen={isGoalOpen} onClose={() => setGoalOpen(false)}>
        <CreateGoalPage />
      </BottomSheet>

      <AddIncomeSheet
        isOpen={isIncomeOpen}
        onClose={() => setIncomeOpen(false)}
      />

    </div>
  );
};