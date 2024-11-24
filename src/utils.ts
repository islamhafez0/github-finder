import { formatDistanceToNow } from "date-fns";
export function timeAgo(timestamp: string): string {
  return formatDistanceToNow(timestamp);
}

export function abbreviateNumber(number: number) {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return (number / 1000000).toFixed(1) + "M";
  }
}

export const bgStyles = (language: string) => {
  const styles = {
    backgroundColor:
      language === "HTML"
        ? "#e34c26"
        : language === "CSS"
        ? "#563d7c"
        : language === "JavaScript"
        ? "#f1e05a"
        : language === "TypeScript"
        ? "#3178c6"
        : language === "Python"
        ? "#3572A5"
        : language === "Go"
        ? "#00ADD8"
        : language === "Kotlin"
        ? "#A97BFF"
        : language === "C++"
        ? "#f34b7d"
        : language === "Java"
        ? "#b07219"
        : language === "Dart"
        ? "#00B4AB"
        : language === "Rust"
        ? "#dea584"
        : language === "Jupyter Notebook"
        ? "#DA5B0B"
        : language === "Verilog"
        ? "#b2b7f8"
        : language === "Swift"
        ? "#F05138"
        : language === "Shell"
        ? "#89e051"
        : language === "Jsonnet"
        ? "#0064bd"
        : language === "C"
        ? "#555555"
        : language === "c#"
        ? "#178600"
        : language === "Objective-C"
        ? "#438eff"
        : language === "Vue"
        ? "#41b883"
        : language === "Nix"
        ? "#7e7eff"
        : language === "Solidity"
        ? "#AA6746"
        : language === "HCL"
        ? "#844FBA"
        : language === "PowerShell"
        ? "#012456"
        : language === "PHP"
        ? "#4F5D95"
        : language === "AL"
        ? "#3AA2B5"
        : language === "Starlark"
        ? "#76d275"
        : language === "OCaml"
        ? "#ef7a08"
        : language === "Ruby"
        ? "#701516"
        : language === "Haskell"
        ? "#5e5086"
        : language === "Objective-C++"
        ? "Objective-C++"
        : language === "Scala"
        ? "#c22d40"
        : language === "Zig"
        ? "#ec915c"
        : language === "SCSS"
        ? "#c6538c"
        : language === "Sass"
        ? "#a53b70"
        : language === "Emacs Lisp"
        ? "#c065db"
        : language === "CoffeeScript"
        ? "#244776"
        : language === "Io"
        ? "#a9188d"
        : language === "Erlang"
        ? "#B83998"
        : language === "Perl"
        ? "#0298c3"
        : language === "Scheme"
        ? "#1e4aec"
        : language === "Hack"
        ? "#878787"
        : "#ccc",
  };
  return styles;
};
