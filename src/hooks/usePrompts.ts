import { useEffect, useState } from 'react';

export function usePrompts(mode: 'kid'|'teen'|'parent' = 'parent') {
  const [prompts, setPrompts] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const p = await import(`../../prompts/${mode}.json`);
      setPrompts(p.default);
    })();
  }, [mode]);
  return prompts;
}
