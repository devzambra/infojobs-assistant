import { createContextId } from "@builder.io/qwik";

export const QUESTIONS = [
    "¿En qué sector estás buscando?",
    "¿Qué puesto buscas?",
    "¿Prefieres remoto, híbrido, o presencial?",
    "¿Qué salario te gustaría (bruto anual)?",
    "¿Prefieres alguna ciudad en concreto?"
];


type AssistantState = {
    currentQuestion: number,
    chatBubles: { class: string, value: string }[],
    offers: any[]
}

export const AssistantContext =
    createContextId<AssistantState>("assistant.context");

export const initialState: AssistantState = {
    currentQuestion: 0,
    chatBubles: [
        { class: "assistantBuble", value: QUESTIONS[0] },
    ],
    offers: []
}