import { ReactComponent as ForumIcon } from "../../assets/icons/forum.svg";
import { ReactComponent as GovIcon } from "../../assets/icons/governance.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import { ReactComponent as SushiIcon } from "../../assets/icons/sushi.svg";
import { SvgIcon } from "@material-ui/core";
import { AccountBalanceOutlined, MonetizationOnOutlined } from "@material-ui/icons";

const externalUrls = [
  {
    title: "Buy on SushiSwap",
    url: "https://app.sushi.com/swap",
    icon: <SvgIcon viewBox="0 0 64 64" color="primary" component={SushiIcon} />,
  },
  {
    title: "Goldma Pro",
    label: "(Coming soon)",
    icon: <MonetizationOnOutlined viewBox="0 0 20 24" />,
  },
  {
    title: "Goldma Bank",
    label: "(Coming soon)",
    icon: <AccountBalanceOutlined viewBox="0 0 20 24" />,
  },
  {
    title: "Docs",
    url: "https://nevaquit.gitbook.io/goldma-dao/",
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  },
];

export default externalUrls;
