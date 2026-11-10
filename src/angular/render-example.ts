// Loaded only in the browser through a dynamic import from RenderedExample.
// The compiler import must stay first: isometric-angular ships partially
// compiled (linker-ready) components, which Angular links at runtime in JIT
// mode as soon as their modules are evaluated.
import "@angular/compiler";
import {
  type ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  createComponent,
  enableProdMode,
  provideZonelessChangeDetection,
  type Type,
} from "@angular/core";
import { createApplication } from "@angular/platform-browser";
import { Isometric } from "isometric-angular";
import {
  IsometricCube,
  IsometricCubeSide,
} from "isometric-angular/isometric-cube";
import { IsometricGrid } from "isometric-angular/isometric-grid";
import { IsometricPlane } from "isometric-angular/isometric-plane";

export type ExampleDefinition = {
  template: string;
  styles?: string;
};

/** Everything an example template can use without importing it. */
const EXAMPLE_IMPORTS = [
  Isometric,
  IsometricCube,
  IsometricCubeSide,
  IsometricPlane,
  IsometricGrid,
];

if (process.env.NODE_ENV === "production") {
  enableProdMode();
}

let application: Promise<ApplicationRef> | undefined;
const compiledExamples = new Map<string, Type<unknown>>();

function getApplication(): Promise<ApplicationRef> {
  application ??= createApplication({
    providers: [provideZonelessChangeDetection()],
  });

  return application;
}

function getExampleComponent({
  template,
  styles,
}: ExampleDefinition): Type<unknown> {
  const cacheKey = JSON.stringify([template, styles]);
  const cached = compiledExamples.get(cacheKey);

  if (cached) {
    return cached;
  }

  const example = Component({
    selector: "isometric-docs-example",
    imports: EXAMPLE_IMPORTS,
    template,
    styles: styles ? [styles] : [],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })(class DocsExample {});

  compiledExamples.set(cacheKey, example);

  return example;
}

/**
 * Mounts an Angular template into `hostElement` and resolves with a function
 * that destroys it again.
 */
export async function renderExample(
  hostElement: HTMLElement,
  definition: ExampleDefinition,
): Promise<() => void> {
  const appRef = await getApplication();

  const componentRef = createComponent(getExampleComponent(definition), {
    environmentInjector: appRef.injector,
    hostElement,
  });

  appRef.attachView(componentRef.hostView);
  componentRef.changeDetectorRef.detectChanges();

  return () => {
    appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  };
}
