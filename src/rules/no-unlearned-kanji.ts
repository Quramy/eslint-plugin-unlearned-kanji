import { Rule } from "eslint";
import type { Node } from "estree";
import { indexOfUnlearnedKanji } from "../functions/kanji";

const rule: Rule.RuleModule = {
  create: context => {
    return {
      JSXText: (node: Node & { readonly value?: string }) => {
        if (!node.value || !node.loc) return;
        const result = indexOfUnlearnedKanji(node.value, 4);
        const nodeIndex = context.getSourceCode().getIndexFromLoc(node.loc.start);
        result.forEach(x => {
          const pos = context.getSourceCode().getLocFromIndex(nodeIndex + x.index);
          context.report({
            message: `Found kanji "${node.value![x.index]}" not learned by grade${x.grade}`,
            loc: {
              start: context.getSourceCode().getLocFromIndex(nodeIndex + x.index),
              end: context.getSourceCode().getLocFromIndex(nodeIndex + x.index + 1),
            },
          });
        });
      },
    };
  },
};

export = rule;
