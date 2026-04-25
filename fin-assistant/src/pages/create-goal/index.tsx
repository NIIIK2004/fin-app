import { useState } from "react";
import styles from "./CreateGoal.module.css";
import { createGoalService } from "../../entities/goal/model/service";

type StepOneData = {
    title: string;
    description: string;
    emoji: string;
}

type StepTwoData = {
    targetAmount: number;
    currentAmount: number;
    incomePercent: number;
}

export const CreateGoalPage = () => {
    const [step, setStep] = useState(1)

    const [stepOneData, setStepOneData] = useState<StepOneData>({
        title: "",
        description: "",
        emoji: "",
    })

    const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
        targetAmount: 0,
        currentAmount: 0,
        incomePercent: 0,
    })

    const handleCreateGoal = async () => {
        try {
            await createGoalService({
                ...stepOneData,
                ...stepTwoData,
            })

            setStep(3)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.wrapper}>
            {step === 1 && (
                <div>
                    <h1>Create Goal — Step 1</h1>
                    <input
                        type="text"
                        placeholder="Goal title"
                        value={stepOneData.title}
                        onChange={(e) =>
                            setStepOneData({
                                ...stepOneData,
                                title: e.target.value,
                            })
                        }
                    />

                    <textarea
                        placeholder="Goal description"
                        value={stepOneData.description}
                        onChange={(e) =>
                            setStepOneData({
                                ...stepOneData,
                                description: e.target.value,
                            })
                        }
                    />


                    <input
                        type="text"
                        placeholder="Emoji (например 🎧, 🚗, 💰)"
                        value={stepOneData.emoji}
                        onChange={(e) =>
                            setStepOneData({
                                ...stepOneData,
                                emoji: e.target.value,
                            })
                        }
                    />



                    <button onClick={() => setStep(2)}>
                        Next Step
                    </button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h1>Create Goal — Step 2</h1>

                    <input
                        type="number"
                        placeholder="Target amount"
                        value={stepTwoData.targetAmount}
                        onChange={(e) =>
                            setStepTwoData({
                                ...stepTwoData,
                                targetAmount: Number(e.target.value),
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Already saved"
                        value={stepTwoData.currentAmount}
                        onChange={(e) =>
                            setStepTwoData({
                                ...stepTwoData,
                                currentAmount: Number(e.target.value),
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Income percent (%)"
                        value={stepTwoData.incomePercent}
                        onChange={(e) =>
                            setStepTwoData({
                                ...stepTwoData,
                                incomePercent: Number(e.target.value),
                            })
                        }
                    />

                    <button onClick={handleCreateGoal}>
                        Create Goal
                    </button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Goal created 🎉</h2>

                    <p>Title: {stepOneData.title}</p>
                    <p>Emoji: {stepOneData.emoji}</p>
                    <p>Target: {stepTwoData.targetAmount}</p>
                    <p>Percent: {stepTwoData.incomePercent}%</p>

                    <button onClick={() => (window.location.href = "/")}>
                        Go Home
                    </button>

                    <button onClick={() => setStep(1)}>
                        Create another
                    </button>
                </div>
            )}
        </div>
    );
};

