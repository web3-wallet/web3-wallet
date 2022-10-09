import type { FlexProps } from '@chakra-ui/react';
import { Code, Flex } from '@chakra-ui/react';
import type { Docs } from '@site/types/Docs';
import { useEffect, useRef } from 'react';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import { xonokai as syntaxTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);

type MarkdownProps = {
  docs: Docs;
} & Omit<FlexProps, 'children'>;

export const Markdown = ({
  docs: { content, toc },
  ...props
}: MarkdownProps) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const MarkdownComponents: Components = {
    // SyntaxHighlight code will go here
    code({ node, className, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const hasMeta = node?.data?.meta;

      return match ? (
        <SyntaxHighlighter
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={syntaxTheme as any}
          language={match[1]}
          // PreTag="div"
          className="syntax-highlighter"
          customStyle={{
            border: 'none',
            margin: '1.5em 0',
          }}
          showLineNumbers={false}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(props as any)}
        />
      ) : (
        <Code className={className}>{props.children}</Code>
      );
    },
  };

  useEffect(() => {
    if (!ref.current) return;
    const headings = ref.current.querySelectorAll('h1,h2,h3,h4');
    [...headings].forEach((elem) => {
      const id = elem.innerHTML.toLowerCase().split(' ').join('-');
      elem.id = id;
    });
  }, [toc]);

  return (
    <Flex {...props} ref={ref} className="site-markdown" flexDirection="column">
      <ReactMarkdown
        rehypePlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </Flex>
  );
};
