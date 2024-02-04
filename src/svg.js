import React from "react";
import PropTypes from "prop-types";
import * as Icons from "Images/icons";
import { SvgIcon } from "@material-ui/core";

export default function AppSVGIcon(props) {
  const { icon, width, height, color, styles } = props;
  return (
    <SvgIcon
      htmlColor={color}
      component={Icons[icon]}
      style={{ width, height, ...styles }}
    />
  );
}

AppSVGIcon.propTypes = {
  icon: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  styles: PropTypes.object,
};
