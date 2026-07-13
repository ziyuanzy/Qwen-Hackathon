export interface Vision {

    is_valid_image: boolean;

    invalid_reason?: string;

    description?: string;

    damage?: string;

    confidence?: number;

    hazards: string[];

    consistency?: "MATCH" | "PARTIAL_MATCH" | "MISMATCH";

    consistency_reason?: string;

}

export interface Classification {

    category: string;

}

export interface Priority {

    priority: string;

    reason: string;

}

export interface Planner {

    recommended_contractor: string;

    estimated_duration: string;

    estimated_cost: string;

    immediate_actions: string[];

    explanation: string;

    reference_description: string;

}

export interface Communication {

    tenant_message: string;

    internal_summary: string;

    contractor_message: string;

}

export interface Analysis {

    vision?: Vision | null;

    classification: Classification;

    priority: Priority;

    planner: Planner;

    communication: Communication;

}

export interface Ticket {

    id: number;

    tenant_name: string;

    unit_number: string;

    tenant_message: string;

    image_path?: string | null;

    status: string;

    created_at: string;

    analysis: Analysis;

}