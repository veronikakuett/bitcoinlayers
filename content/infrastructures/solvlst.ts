import {
    InfrastructureProject,
    Purpose,
    Type,
    LiveStatus,
    EntityType,
    Site,
    AssessmentCategory,
} from "../props";

const solv: InfrastructureProject = {
    type: Type.Infrastructure,
    slug: "solv",
    title: "Solv",
    entityType: EntityType.BTCWrapper,
    live: LiveStatus.Mainnet,
    staking: false,
    bridge: true,
    underReview: true,
    riskFactors: ["", ""],
    nativeToken: "",
    purpose: Purpose.General,
    associatedLayers: "Ethereum, BNB, Arbitrum, Avalanche, Merlin, BOB, Base",
    bitcoinOnly: false,
    links: [
        {
            text: Site.Website,
            url: "https://solv.finance/",
        },
        {
            text: Site.Docs,
            url: "https://solv.finance/",
        },
        {
            text: Site.Explorer,
            url: "https://docs.solv.finance/",
        },
        {
            text: Site.GitHub,
            url: "https://github.com/solv-finance",
        },
        {
            text: Site.Twitter,
            url: "https://x.com/SolvProtocol",
        },
    ],
    description: "Solv offers a liquid staking protocol that enables users to deposit SolvBTC into smart contracts on EVM-base chains. A staking provider will then delegate this stake on their behalf to a Babylon Finality Provider.",
    sections: [
        {
            id: "apy",
            title: "How APY is determined",
            content: [
                {
                    title: "Yield from Bitcoin staking is determined by the Bitcoin Finality Provider in the Babylon protocol",
                    content: "The custodians who delegate stake on users’ behalf may also determine a rate at which they redistribute rewards back to users.",
                },
            ],
        },
        {
            id: "smartcontracts",
            title: "Smart Contracts & Audits",
            content: [
                {
                    title: "Dozens of token contracts live",
                    content: "There are numerous Solv BTC token contracts deployed across many chains. You can find them [here](https://github.com/solv-finance/SolvBTC/tree/main/deployments).\n\n🔬 We are currently reviewing the implementations of these smart contracts.",
                },
            ],
        },
        {
            id: "knowledgeBits",
            title: "Knowledge Bits",
            content: [
                {
                    title: "Learn more",
                    content: "[Solv docs](https://docs.solv.finance/)",
                },
            ],
        },
    ],
    assessment: [
        {
            category: AssessmentCategory.AssetCustody,
            score: 0,
            tier: "",
            title: "Bitcoin assets used to back Solv LSTs are custodied by institutional providers",
            content:
                "Five entities proposedly custody the bitcoin assets backing Solv LST tokens. These entities are Antalpha, Cobo, Ceffu, Fireblocks and the Solv Guard. These entities are known as Guardians in the [Solv application](https://app.solv.finance/staking).\n\nCeffu and Cobo are the custodians for funds that are staked with Babylon.",
        },
        {
            category: AssessmentCategory.StakingType,
            score: 0,
            tier: "",
            title: "Stake is delegated to Babylon Finality Providers via Ceffu and Cobo",
            content:
                "When a user exchanges SolvBTC for an LST token, this token is locked in a SolvBTC.LST smart contract on its respective chain. After this token deposit is confirmed, one of the guardians will deposit bitcoin into Babylon on the users behalf. This role is also fulfilled by the Staking Validators.\n\nFor staking on Bitcoin, the custodians who delegate user funds are Ceffu and Cobo. Both Cobo and the Solv Protocol\n\nLearn more about delegated staking here.",
        },
        {
            category: AssessmentCategory.SlashingRisk,
            score: 0,
            tier: "",
            title: "Users' funds can be slashed, or liquidated, in two scenarios",
            content:
                "The first is that the Babylon Finality Provider, that their stake is delegated to, is slashed and penalized. This penalty will also be inflicted onto its delegates.\n\nThe second is that the user locks their funds in a vault executing a specific trading strategy and they get liquidated.",
        },
        {
            category: AssessmentCategory.IncentiveModel,
            score: 0,
            tier: "",
            title: "Profits are earned from users being distributed rewards from third parties",
            content:
                "Users can earn rewards through yield (in the form of alternative token issuance) through staking on a PoS chain or earn profits via the vault they supply liquidity for.\n\n⚠️ Users do not earn yield directly in the LST model. They supply tokens for other parties to leverage on their behalf.",
        },
    ],
};

export default solv;
