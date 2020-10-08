import React, { FunctionComponent, HTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';
import 'twin.macro';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  isAnimating: boolean;
}

const DropdownContainer = styled.div<Props>(({ isOpen }) => [
  tw`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg transform transition ease-out duration-200 opacity-0 scale-95`,
  isOpen && tw`opacity-100 scale-100 ease-in duration-75`,
]);

{
  /* <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */
}

const Dropdown: FunctionComponent<Props> = ({
  children,
  isAnimating,
  isOpen,
  onTransitionEnd,
  ...props
}) =>
  !(isOpen || isAnimating) ? null : (
    <DropdownContainer
      {...props}
      // TODO: fix this specificity prod bug
      tw="w-full"
      isOpen={isOpen}
      isAnimating={isAnimating}
      onTransitionEnd={onTransitionEnd}
    >
      <div
        tw="py-1 rounded-md bg-white shadow-xs"
        role="menu"
        aria-orientation="vertical"
      >
        {children}
      </div>
    </DropdownContainer>
  );

export default Dropdown;
