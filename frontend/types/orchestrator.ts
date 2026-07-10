export interface VisionResult {
    damage: string;
    confidence: number;
    hazards: string[];
}

export interface ClassificationResult {
    category: string;
    subcategory: string;
}

export interface PriorityResult {
    priority: string;
    reason: string;
}

export interface PlannerResult {
    summary: string;
    contractor_type: string;
    estimated_time: string;
    materials: string[];
    steps: string[];
}

export interface CommunicationResult {
    tenant_message: string;
    manager_summary: string;
}

export interface OrchestratorResult {
    vision: VisionResult;
    classification: ClassificationResult;
    priority: PriorityResult;
    planner: PlannerResult;
    communication: CommunicationResult;
}