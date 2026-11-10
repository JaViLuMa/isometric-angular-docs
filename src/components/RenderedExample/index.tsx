import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type RenderedExampleProps = {
  /** Angular template rendered with the isometric-angular components. */
  template: string;
  /** Optional component styles, scoped to the example like any component. */
  styles?: string;
  className?: string;
};

export default function RenderedExample({
  template,
  styles: exampleStyles,
  className,
}: RenderedExampleProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const container = hostRef.current;

    if (!container) {
      return;
    }

    // Angular owns this element; React only owns the container around it.
    const hostElement = document.createElement("div");
    container.append(hostElement);

    let disposed = false;
    let destroyExample: (() => void) | undefined;

    setError(undefined);

    import("@site/src/angular/render-example")
      .then(({ renderExample }) =>
        renderExample(hostElement, { template, styles: exampleStyles }),
      )
      .then((destroy) => {
        if (disposed) {
          destroy();
        } else {
          destroyExample = destroy;
        }
      })
      .catch((reason: unknown) => {
        if (!disposed) {
          setError(reason instanceof Error ? reason.message : String(reason));
        }
      });

    return () => {
      disposed = true;
      destroyExample?.();
      hostElement.remove();
    };
  }, [template, exampleStyles]);

  const mergedClassName = className
    ? `${styles.exampleFrame} ${className}`
    : styles.exampleFrame;

  return (
    <div className={mergedClassName}>
      <div ref={hostRef} />
      {error ? (
        <pre className={styles.exampleError} role="alert">
          {error}
        </pre>
      ) : null}
    </div>
  );
}
