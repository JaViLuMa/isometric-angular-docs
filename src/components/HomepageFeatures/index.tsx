import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";
import type { ReactNode } from "react";

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "CSS Variable Driven",
    description: (
      <>
        Customize colors, edges, shadows, and animation behavior through CSS
        custom properties without changing component logic.
      </>
    ),
  },
  {
    title: "Built for Modern Angular",
    description: (
      <>
        Standalone components with signal inputs and <code>OnPush</code> change
        detection, ready for zoneless applications.
      </>
    ),
  },
  {
    title: "Any Host Element",
    description: (
      <>
        Attribute selectors let you turn a <code>section</code>,{" "}
        <code>button</code>, or <code>li</code> into an isometric shape while
        keeping its native attributes and bindings.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="padding-horiz--md text--center">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
