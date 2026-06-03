export type CustodyEntry = {
  id: string;
  date: string;
  actor: string;
  role: 'maker' | 'gallery' | 'collector' | 'institution' | 'platform';
  location: string;
  action:
    | 'created'
    | 'verified'
    | 'consigned'
    | 'transferred'
    | 'exhibited'
    | 'scanned';
  note: string;
};

export type IdentityRecord = {
  id: string;
  artworkId: string;
  certificateId: string;
  recordId: string;
  hash: string;
  blockNumber: number;
  mintedAt: string;
  network: string;
  currentKeeper: string;
  authenticityStatus: 'identified' | 'verified';
  provenanceSummary: string;
  metadata: {
    registryVersion: string;
    captureMethod: string;
    condition: string;
    surface: string;
    geostamp: string;
  };
  custody: CustodyEntry[];
};
