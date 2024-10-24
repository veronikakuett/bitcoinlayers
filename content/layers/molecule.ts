import {
    LayerProject,
    Type,
    LiveStatus,
    RiskFactor,
    EntityType,
    Site,
    RiskSection,
    ContentSection,
    RiskCategory,
} from "../props";

const molecule: LayerProject = {
    type: Type.Layer,
    slug: "molecule",
    title: "Molecule",
    entityType: EntityType.Rollup,
    live: LiveStatus.Announced,
    staking: false,
    bridge: false,
    underReview: true,
    riskFactors: ["", "", "", ""],
    btcLocked: 0,
    nativeToken: "-",
    feeToken: "-",
    bitcoinOnly: false,
    links: [
        {
            text: Site.Website,
            url: "https://twitter.com/moleculebtc",
        },
        {
            text: Site.Website,
            url: "https://twitter.com/moleculebtc",
        },
        {
            text: Site.Docs,
            url: "https://twitter.com/moleculebtc",
        },
        {
            text: Site.Explorer,
            url: "https://twitter.com/moleculebtc",
        },
        {
            text: Site.GitHub,
            url: "https://twitter.com/moleculebtc",
        },
        {
            text: Site.Twitter,
            url: "https://twitter.com/moleculebtc",
        },
    ],
    description:
        "Molecule is a proposed Layer 2 design that will leverage the Solana virtal machine. They have recently announced the project, with information on the design expected to be coming soon. Little information is available on how it inherits Bitcoin security.",
    riskAnalysis: [
        {
            category: RiskCategory.UnilateralExits,
            score: 0,
            tier: "",
            title: "",
            content: "",
        },
        {
            category: RiskCategory.DataAvailability,
            score: 0,
            tier: "",
            title: "",
            content: "",
        },
        {
            category: RiskCategory.BlockProduction,
            score: 0,
            tier: "",
            title: "",
            content: "",
        },
        {
            category: RiskCategory.StateValidation,
            score: 0,
            tier: "",
            title: "",
            content: "",
        },
    ],
    sections: [
        {
            id: "selfsubmit",
            title: "Process to self-submit information",
            content: [
                {
                    content:
                        "The Bitcoin Layers project prioritizes risk reviews on projects that are in production and accepting users' BTC deposits. Projects on testnet are welcome to submit information about their project. We do not publish risk assessments for projects that are not in production.\n\nHere are the [instructions](https://github.com/bitcoinlayers/bitcoinlayers/blob/main/SELFSUBMIT.md) on self-submitting a project.",
                },
            ],
        },
    ],
};

export default molecule;