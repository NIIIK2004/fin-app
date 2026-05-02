import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../app/providers/auth";
import { useGoals } from "../../features/income/add/hooks/useGoals";
import { AddIncomeSheet } from "../../features/income/add/ui";
import { BottomSheet } from "../../shared/ui/BottomSheet/BottomSheet";
import { Button } from "../../shared/ui/Button/Button";
import { BottomActions } from "../../widgets/BottomActions";
import { EmptyGoalsState } from "../../widgets/EmptyGoalsState";
import { GoalCard } from "../../widgets/GoalCard";
import { GoalCardSkeleton } from "../../widgets/GoalCard/GoalCardSkeleton";
import { KanyeQuote } from "../../widgets/KanyeQuote";
import { CreateGoalPage } from "../create-goal";
import styles from "./home.module.css";

type ViewMode = "smart" | "goals" | "expense";

export const HomePage = () => {
  const [mode, setMode] = useState<ViewMode>("smart");
  const { goals, loading, refetch } = useGoals();
  const [isGoalOpen, setGoalOpen] = useState(false);
  const [isIncomeOpen, setIncomeOpen] = useState(false);
  const navigate = useNavigate();

  if (!loading && !goals.length) {
    return (
      <div className="container">
        <EmptyGoalsState
          onCreateGoal={() => setGoalOpen(true)}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>

      <div className="container">
        <ul className={styles.tabs}>
          <li>
            <Button
              className={clsx(styles.tab, mode === "smart" && styles.active)}
              fontSize={21}
              radius={100}
              // padding={13, 19}
              width="auto"
              onClick={() => setMode("smart")}
            >
              Smart
            </Button>
          </li>
          <li>
            <Button
              className={clsx(styles.tab, mode === "goals" && styles.active)}
              fontSize={21}
              radius={100}
              // padding={13, 19}
              width="auto"
              onClick={() => setMode("goals")}
            >
              Goals
            </Button>
          </li>
          <li>
            <Button
              className={clsx(styles.tab, mode === "expense" && styles.active)}
              fontSize={21}
              radius={100}
              // padding={13, 19}
              width="auto"
              onClick={() => setMode("expense")}
            >
              Expense
            </Button>
          </li>
        </ul>

        <main className={styles.content}>
          {mode === "smart" && (
            <>
              <KanyeQuote />
              <div className={styles.sectionGoals}>
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                    <GoalCardSkeleton key={i} />
                  ))
                  : goals.slice(0, 5).map((goal) => (
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
              <div>
                Transactions section (потом добавим)
              </div>
            </>
          )}

          {mode === "goals" && (
            <div className={styles.sectionGoals}>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                  <GoalCardSkeleton key={i} />
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
          )}

          {mode === "expense" && (
            <div className={styles.empty}>
              Expenses пока пустые
            </div>
          )}

        </main>

        <BottomActions
          onCreateGoal={() => navigate("/create-goal")}
          onAddIncome={() => setIncomeOpen(true)}
          onCreateExpense={() => { }}
        />

        <BottomSheet isOpen={isGoalOpen} onClose={() => setGoalOpen(false)}>
          <CreateGoalPage />
        </BottomSheet>

        <AddIncomeSheet
          isOpen={isIncomeOpen}
          onClose={() => setIncomeOpen(false)}
          onSuccess={refetch}
        />

        <Button className="smallButtonWhite" onClick={logoutUser}>
          Выйти из аккаунта
        </Button>

      </div>
    </div>

  );
};