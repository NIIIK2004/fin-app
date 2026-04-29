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
import { Header } from "../../widgets/Header";
import { BottomActions } from "../../widgets/BottomActions";
import { GoalCardSkeleton } from "../../widgets/GoalCard/GoalCardSkeleton";
import { EmptyGoalsState } from "../../widgets/EmptyGoalsState";

export const HomePage = () => {
  const { goals, loading, refetch } = useGoals();
  const [isGoalOpen, setGoalOpen] = useState(false);
  const [isIncomeOpen, setIncomeOpen] = useState(false);

  if (!loading && !goals.length) {
    return (
      <div className="container">
        <Header
          onHistoryClick={() => { }}
          onSettingsClick={() => { }}
        />

        <EmptyGoalsState
          onCreateGoal={() => setGoalOpen(true)}
        />

        <BottomSheet isOpen={isGoalOpen} onClose={() => setGoalOpen(false)}>
          <CreateGoalPage />
        </BottomSheet>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      <div className="container">

        <Header
          onHistoryClick={() => { }}
          onSettingsClick={() => { }}
        />

        <main className={styles.content}>
          <KanyeQuote />
          <div className={styles.sectionGoals}>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                <GoalCardSkeleton key={index} />
              ))
              : goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  currentAmount={goal.currentAmount}
                  emoji={goal.emoji}
                  incomePercent={goal.incomePercent}
                  title={goal.title}
                  type="goal"
                  targetAmount={goal.targetAmount}
                />
              ))}
          </div>

          <BottomActions
            onCreateGoal={() => setGoalOpen(true)}
            onAddIncome={() => setIncomeOpen(true)}
            onCreateExpense={() => { }}
          />
        </main>

        <BottomSheet isOpen={isGoalOpen} onClose={() => setGoalOpen(false)}>
          <CreateGoalPage />
        </BottomSheet>

        <AddIncomeSheet
          isOpen={isIncomeOpen}
          onClose={() => setIncomeOpen(false)}
        />

        <Button className="smallButtonWhite" onClick={logoutUser}>
          Выйти из аккаунта
        </Button>

      </div>
    </div>

  );
};