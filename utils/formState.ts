// State returned to the forms via useActionState (shared by actions and client forms).
export type FormState = { error?: string; ok?: boolean };

// Action signature used with useActionState.
export type FormAction = (prev: FormState | undefined, formData: FormData) => Promise<FormState>;
