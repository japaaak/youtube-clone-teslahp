import { useMotionValue } from "framer-motion";
import { useContext, useEffect } from "react";
import ModelsContext from "./ModelsContext";

export default function useWrapperScroll() {
  const { wrapperRef } = useContext(ModelsContext);

  const scrollY = useMotionValue(0); // Quantidade de px que usuario esta escrolando
  const scrollYProgress = useMotionValue(0) // % que o usuario pode escrolar

  useEffect(() => {
    const element = wrapperRef.current;

    if (element) {
      const updateScrollValue = () => {
          const { scrollTop, scrollHeight, offsetHeight } = element;

          const fullScroll = scrollHeight - offsetHeight;

          scrollY.set(scrollTop); //number
          scrollYProgress.set(scrollTop / fullScroll); // 0 - 1 %
      }

      element.addEventListener('scroll', updateScrollValue);

      return () => element?.removeEventListener('scroll', updateScrollValue);
    }
  }, []);
  return { scrollY, scrollYProgress }
}
