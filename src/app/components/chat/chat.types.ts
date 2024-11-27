export interface Profile {
    id?: string;
    name?: string;
    username?: string;
    picture?: string;
    about?: string;
    displayName?: string;
    website?: string;
    banner?: string;
    lud06?: string;
    lud16?: string;
    nip05?: string;
}

export interface Contact {
    pubKey?: string;
    name?: string;
    username?: string;
    avatar?: string; // TODO: I introduced this to fix strict mode, must be verified.
    picture?: string;
    about?: string;
    displayName?: string;
    website?: string;
    banner?: string;
    lud06?: string;
    lud16?: string;
    nip05?: string;
}

export interface Chat {
    id?: string;
    contactId?: string;
    contact?: Contact;
    unreadCount?: number;
    muted?: boolean;
    lastMessage?: string;
    lastMessageAt?: number;
    messages?: {
        id?: string;
        chatId?: string;
        contactId?: string;
        isMine?: boolean;
        value?: string;
        createdAt?: string;
    }[];
}
