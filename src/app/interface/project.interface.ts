export interface Project {
    projectIdentifier: string;
    nostrPubKey: string;
    displayName?: string;
    name?: string // TODO: Verify if this is actually a possible value?
    totalInvestmentsCount?: number; // TODO: Verify if this is wrong type or not? There is a different project interface.
    about?: string;
    picture?: string;
    banner?: string;
    isBookmarked?: boolean
}
