import { DependencyList, useState } from "react";
import { useEffect } from "react";

export const useFlexy = <RootElement extends HTMLElement>(
  ref?: React.RefObject<RootElement> | null
) => {
  /**
   * Defines events for a specific element.
   * @example
   * useEvent('data-name', {
   *   'click': (event) => console.log('clicked', event)
   * })
   */
  const useEvent = <EventKey extends keyof HTMLElementEventMap>(
    dataName: string,
    events: Record<
      EventKey,
      (this: HTMLElement, ev: HTMLElementEventMap[EventKey]) => any
    >,
    deps?: DependencyList
  ) => {
    useEffect(() => {
      const element = ref?.current?.querySelector(
        `[data-name="${dataName}"]`
      ) as HTMLElement;

      for (const eventName in events)
        element?.addEventListener(eventName, events[eventName]);

      return () => {
        for (const eventName in events)
          element?.removeEventListener(eventName, events[eventName]);
      };
    }, deps);
  };

  const selector = (selectors: string) => {
    return ref?.current?.querySelector(selectors) as HTMLElement;
  };

  const useList = (context: {
    list: string;
    item: string;
    preset?: "column-list";
    render?: (context: {
      create: () => HTMLElement;
      select: <ElementType extends HTMLElement>(
        element: HTMLElement,
        dataName: string,
        callback?: (element: ElementType) => unknown
      ) => ElementType | null;
      getHtml: () => string;
    }) => unknown;
    deps?: DependencyList;
  }) => {
    const [componentHTML, setComponentHTML] = useState(null as string | null);

    useEffect(() => {
      let tempComponentHTML = null as string | null;

      const listElement = selector(`[data-name="${context.list}"]`);
      const itemElement = selector(`[data-name="${context.item}"]`);

      const preset = context.preset || "column-list";

      if (listElement) {
        listElement.style.display = "flex";
        if (itemElement) {
          itemElement.style.position = "relative";
          itemElement.style.flexGrow = "0";
          itemElement.style.flexShrink = "0";
          itemElement.style.display = "block";
        }

        if (preset === "column-list") {
          listElement.setAttribute("flexy-list", "");
          listElement.style.flexDirection = "column";
          listElement.style.flexWrap = "nowrap";
          listElement.style.overflow = "scroll";
          listElement.style.gap = "12px";
        }

        if (!componentHTML && itemElement) {
          setComponentHTML(itemElement.outerHTML);
          tempComponentHTML = itemElement.outerHTML;
        }

        // while (listElement.firstChild)
        //   listElement.removeChild(listElement.firstChild)

        if (listElement.firstChild)
          listElement.removeChild(listElement.firstChild);

        if (componentHTML || tempComponentHTML) {
          const html = componentHTML || tempComponentHTML;
          /**
           *
           */
          const create = () => {
            const container = document.createElement("div");
            container.innerHTML = html!;
            const element = container.children[0] as HTMLElement;
            listElement.appendChild(element);
            return element;
          };
          const getHtml = () => {
            return html!;
          };
          /**
           *
           */
          const select = <ElementType extends HTMLElement>(
            element: HTMLElement,
            dataName: string,
            callback?: (element: ElementType) => unknown
          ) => {
            const selected = element.querySelector(`[data-name="${dataName}"]`);
            if (selected) callback?.(selected as ElementType);
            return selected as ElementType;
          };

          if (context.render) context.render({ create, select, getHtml });
        }
      }
    }, context?.deps);
  };

  return { useEvent, selector, useList };
};

export const useAutoBackground = ({
  ref,
  setFitBackgroundColor,
}: {
  ref?: React.RefObject<HTMLElement>;
  setFitBackgroundColor: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  useEffect(() => {
    if (ref && ref.current) {
      const container = ref.current.querySelector(
        "[flexy-container]"
      ) as HTMLElement;

      const computedStyle = getComputedStyle(container);
      if (computedStyle.backgroundColor) {
        setFitBackgroundColor(computedStyle.backgroundColor);
      } else {
        setFitBackgroundColor(null);
      }
    }
  }, [ref]);
};

export const useFitRatioByHeight = ({
  fit,
  ref,
  setFitScale,
}: {
  fit?: "width" | "height";
  ref: React.MutableRefObject<HTMLDivElement | null>;
  setFitScale: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  useEffect(() => {
    if (ref && ref.current) {
      const container = ref.current.querySelector(
        "[flexy-container]"
      ) as HTMLElement;

      if (container && fit === "height") {
        const fitHeightVw = round(
          (container.clientHeight / container.clientWidth) * 100,
          4
        );
        if (!Number.isNaN(fitHeightVw)) {
          const update = () => {
            const deviceResolution = {
              widthPx: window.innerWidth,
              heightPx: window.innerHeight,
            };
            if (fitHeightVw) {
              const currentHeightPx =
                deviceResolution.widthPx * (fitHeightVw / 100);
              const fitScale = deviceResolution.heightPx / currentHeightPx;
              if (fitScale >= 1) {
                setFitScale(null);
              } else {
                setFitScale(`${fitScale}`);
              }
            }
          };
          update();
          window.addEventListener("resize", update);
          return () => window.removeEventListener("resize", update);
        }
      }
    }
  }, [ref]);
};

export const draggableScroll = (
  element: HTMLElement,
  options: {
    direction?: "vertical" | "horizontal" | "both";
  } = { direction: "both" }
) => {
  if (!element) return;
  const { direction } = options;

  let initialPosition = { scrollTop: 0, scrollLeft: 0, mouseX: 0, mouseY: 0 };

  const mouseMoveHandler = (event: { clientX: number; clientY: number }) => {
    if (element) {
      const dx = event.clientX - initialPosition.mouseX;
      const dy = event.clientY - initialPosition.mouseY;

      if (direction !== "horizontal")
        element.scrollTop = initialPosition.scrollTop - dy;
      if (direction !== "vertical")
        element.scrollLeft = initialPosition.scrollLeft - dx;
    }
  };

  const mouseUpHandler = () => {
    if (element) element.style.cursor = "grab";
    document.removeEventListener("mousemove", mouseMoveHandler, false);
    document.removeEventListener("mouseup", mouseUpHandler, false);
  };

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (element) {
      initialPosition = {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
        mouseX: event.clientX,
        mouseY: event.clientY,
      };

      element.style.cursor = "grabbing";
      element.style.userSelect = "none";

      document.addEventListener("mousemove", mouseMoveHandler, false);
      document.addEventListener("mouseup", mouseUpHandler, false);
    }
  };
  element.addEventListener("mousedown", onMouseDown, false);
  return () => element?.removeEventListener("mousedown", onMouseDown, false);
};

export const adjustInlineSvgSize = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  if (!ref.current) return;
  const svgContainers =
    ref.current.querySelectorAll<HTMLElement>("[flexy-inline-svg]");

  for (const svgContainer of Array.from(svgContainers)) {
    if (!svgContainer) continue;
    const svg = svgContainer.querySelector("svg");
    if (!svg) continue;

    const svgWidth = svg.getAttribute("width");
    const svgHeight = svg.getAttribute("height");

    if (svgWidth !== null && svgHeight !== null) {
      const scaleX = svgContainer.clientWidth / Number(svgWidth);
      const scaleY = svgContainer.clientHeight / Number(svgHeight);
      svg.style.transform = `scale(${scaleX}, ${scaleY})`;
    } else if (svgWidth !== null) {
      const scaleX = svgContainer.clientWidth / Number(svgWidth);
      svg.style.transform = `scaleX(${scaleX})`;
    } else if (svgHeight !== null) {
      const scaleY = svgContainer.clientHeight / Number(svgHeight);
      svg.style.transform = `scaleY(${scaleY})`;
    }
  }
};

export const adjustTextSize = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  if (!ref.current) return;
  const texts = ref.current.querySelectorAll<HTMLElement>("[data-text-size]");

  const element = document.createElement("div");
  element.style.fontSize = "0.1px";
  element.style.lineHeight = "1";
  element.innerHTML = "a";
  document.body.appendChild(element);
  const minimunRendableFontSize = element.clientHeight;
  element.remove();

  if (minimunRendableFontSize === 0.1) return;

  for (const text of Array.from(texts)) {
    if (!text || !text.dataset || !text.dataset.textSize || !text.style)
      continue;

    const [fontSizeVw, widthVw, heightVw, lineHeightVw] =
      text.dataset.textSize.split(":");
    const fontSizeVwInt = parseFloat(fontSizeVw);
    const renderPx = (fontSizeVwInt * window.innerWidth) / 100;

    if (renderPx >= minimunRendableFontSize) {
      if (text.style.removeProperty) {
        text.style.removeProperty("transform");
        text.style.removeProperty("width");
        text.style.removeProperty("height");
        text.style.removeProperty("transform-origin");
        text.style.removeProperty("line-height");
      }
    } else {
      // const computedStyle = window.getComputedStyle(text as any)
      // if (computedStyle.whiteSpace === 'nowrap') {
      //   continue
      // }

      const scale = Number(renderPx / minimunRendableFontSize);
      text.style.transform = `scale(${scale})`;

      if (typeof widthVw !== "undefined") {
        const widthInt = parseFloat(widthVw);
        text.style.width = `${widthInt * (1 / scale)}vw`;
      }

      if (typeof heightVw !== "undefined") {
        const heightInt = parseFloat(heightVw);
        text.style.height = `${heightInt * (1 / scale)}vw`;
      }

      if (typeof lineHeightVw !== "undefined") {
        const lineHeightInt = parseFloat(lineHeightVw);
        text.style.lineHeight = `${lineHeightInt * (1 / scale)}vw`;
        if (lineHeightInt * (1 / scale) === 1 / scale) {
          text.style.transformOrigin = `0% 0%`;
        } else {
          text.style.transformOrigin = `${1 / scale}% 0%`;
        }
      } else {
        text.style.transformOrigin = `${1 / scale}% 0%`;
      }
    }
  }
};

export const useAdjustTextSize = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  enabled?: boolean
) => {
  const update = () => enabled !== false && adjustTextSize(ref);
  useEffect(() => {
    update();
    window.addEventListener("resize", update, false);
    return () => window.removeEventListener("resize", update, false);
  }, [ref]);
};

export const useAdjustInlineSvgSize = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  enabled?: boolean
) => {
  const update = () => enabled !== false && adjustInlineSvgSize(ref);
  useEffect(() => {
    update();
    window.addEventListener("resize", update, false);
    return () => window.removeEventListener("resize", update, false);
  }, [ref]);
};

export const round = (number: number, fractionDigits?: number) => {
  const multiplier = Math.pow(10, fractionDigits || 0);
  return Number(
    (Math.round((number + Number.EPSILON) * multiplier) / multiplier).toFixed(
      fractionDigits
    )
  );
};

export const useUniqueClassName = () => {
  const [uniqueClassName, setUniqueClassName] = useState(``);

  useEffect(() => {
    const random = Math.random().toString(36).substring(2, 9);
    setUniqueClassName(`css-${random}`);
  }, []);

  return uniqueClassName;
};

export const ellipsis = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};
