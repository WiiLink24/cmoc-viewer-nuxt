export const useCardHover = (target: Ref<HTMLElement | null>) => {
    const { width, height, left, top } = useElementBounding(target)

    const handleMouseMove = (event: MouseEvent) => {
        if (!target.value) return
        const blur = target.value.querySelector('.blur') as HTMLElement

        const mouseX = event.clientX - left.value - width.value / 2
        const mouseY = event.clientY - top.value - height.value / 2;

        const rotateY = (mouseX / width.value) * 20
        const rotateX = (-mouseY / height.value) * 20

        target.value.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;

        blur.style.left = event.clientX - left.value - 50 + "px"
        blur.style.top = event.clientY - top.value - 50 + "px"
        blur.style.display = "block";
    }

    const resetTransform = () => {
        if (!target.value) return
        target.value.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)`;
        const blur = target.value.querySelector('.blur') as HTMLElement
        blur.style.display = "none";
    }

    return {
        handleMouseMove,
        resetTransform
    }

}