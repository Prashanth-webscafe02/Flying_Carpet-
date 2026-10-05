// Which country site this is (za, in or us). Worked out once per page load:
//  1. the site address: za.flyingcarpet.travel, in.flyingcarpet.travel, us.flyingcarpet.travel;
//  2. otherwise a ?market=za|in|us override (previews and testing), remembered in this browser;
//  3. otherwise a market remembered from an earlier ?market=;
//  4. otherwise India.

export type Market = "za" | "in" | "us";

export const MARKETS: Market[] = ["za", "in", "us"];
export const DEFAULT_MARKET: Market = "in";
const STORAGE_KEY = "fct-market";

const isMarket = (v: unknown): v is Market => MARKETS.includes(v as Market);

function detect(): Market {
  const sub = window.location.hostname.split(".")[0];
  if (isMarket(sub)) return sub;

  const param = new URLSearchParams(window.location.search).get("market")?.toLowerCase();
  if (isMarket(param)) {
    try {
      localStorage.setItem(STORAGE_KEY, param);
    } catch {
      /* storage blocked: the override still applies to this page */
    }
    return param;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isMarket(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  return DEFAULT_MARKET;
}

export const market: Market = detect();
export const isUS = market === "us";

/** The market's name as it reads in copy: "clients travelling from India". */
export const marketName = { za: "South Africa", in: "India", us: "the United States" }[market];

// The US site says "advisor" where the others say "agent" (G12).
export const words = isUS
  ? {
      agent: "advisor",
      agents: "advisors",
      Agent: "Advisor",
      Agents: "Advisors",
      travelAgents: "travel advisors",
      agentRate: "advisor rate",
    }
  : {
      agent: "agent",
      agents: "agents",
      Agent: "Agent",
      Agents: "Agents",
      travelAgents: "travel agents",
      agentRate: "agent rate",
    };
