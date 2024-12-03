export interface CompleteProject {
    project: Project;
    details: ProjectDetails;
    statistics: ProjectStatistics;
    investors: InvestorDetails[];
}
export interface Project {
    founderKey: string;
    nostrEventId: string;
    projectIdentifier: string;
    createdOnBlock: number;
    trxId: string;
}



export interface ProjectDetails {
    founderKey: string;
    founderRecoveryKey: string;
    projectIdentifier: string;
    nostrPubKey: string;
    startDate: number; // UNIX timestamp
    penaltyDays: number;
    expiryDate: number; // UNIX timestamp
    targetAmount: number;
    stages: {
        amountToRelease: number;
        releaseDate: number; // UNIX timestamp
    }[];
    projectSeeders: {
        threshold: number;
        secretHashes: string[];
    };

    displayName?: string;
    name?: string;
    about?: string;
    picture?: string;
    banner?: string;
    isBookmarked: boolean;
}

export interface ProjectStatistics {
    investorCount: number;
    amountInvested: number;
    amountSpentSoFarByFounder: number;
    amountInPenalties: number;
    countInPenalties: number;
}

export interface InvestorDetails {
    projectIdentifier: string;
    investorPublicKey: string;
    totalAmount: number;
    transactionId: string;
    hashOfSecret: string;
    isSeeder: boolean;
}
