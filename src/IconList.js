// React Dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";

// Shared Dependencies
import {
  ListItemText,
  ListItemIcon,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import useValidator from "utils/UseValidator";
import AppSVGIcon from "components/AppSVGIcon";

/**
 * Styling constants for the material design that is used in their respective jsx
 */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formInput: {
    width: "100%",
  },
  inputCategory: {
    position: "absolute",
    right: 0,
  },
  dialogContentHeading: {
    height: 30,
    marginBottom: 15,
  },
  dialogFormControl: {
    position: "absolute",
    height: 32,
    background: "#EBEBEC",
    border: "1px solid #D8D8D9",
    boxSizing: "border-box",
    borderRadius: 2,
    width: "100%",
    padding: 10,
  },
  formControlSection: {
    width: "100%",
    height: 30,
  },
  inputComponent: {
    position: "relative",
    color: "#aaa",
    fontSize: 12,
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    right: 10,
    zIndex: 1,
  },
  inputLabel: {
    fontSize: 12,
    lineHeight: 2,
    color: "#636367",
  },
  selectedMenuItem: {
    "& .MuiSelect-root": {
      display: "flex",
    },
    "& .MuiListItemIcon-root": {
      display: "flex",
      alignItems: "center",
    },
  },
}));

/**
 * Helps in understanding the functionality of the Input box that is used in the application
 * @param {*} props is an argument that holds the inputs that are passed from the parent component
 */
export function IconListBox(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 270,
        width: 250,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const checkValidation = (currentValue) => {
    const { validationError, validationErrorMessage } = useValidator(
      props.validation,
      currentValue,
      props.selectedElement
    );
    setError(validationError);
    setErrorMessage(validationErrorMessage);
  };

  const onChangeValue = (e) => {
    props.onValueChange(props.formKey, e.target.value, props.isStyle);
    if (props.validation) {
      checkValidation(e.target.value);
    }
  };

  const onblurChange = (e) => {
    props.onValueChange(props.formKey, e.target.value, props.isStyle);
    if (props.validation) {
      checkValidation(e.target.value);
    }
  };

  return (
    <div>
      {props?.labelText && (
        <label className={classes.inputLabel}>{props?.labelText}</label>
      )}
      <div className={classes.inputComponent}>
        {props?.isInlineTextEnabled && (
          <span className={classes.inputIcon}>{props?.isInlineText}</span>
        )}
        <div className={classes.formControlSection}>
          <input
            className={`tappable ${classes.dialogFormControl}`}
            error={error.toString() === "true"}
            value={props?.initialValue}
            onChange={(e) => onChangeValue(e)}
            onBlur={(e) => onblurChange(e)}
            inputprops={{ "aria-label": "description" }}
            maxLength={props?.maximumLength}
            // data-testid="dropdown-list"
            data-testid={`icon-dropdown-list-${props.formKey}`}
            id="dropdown-list"
          />

          <Select
            className={`${classes.dialogFormControl} ${classes.selectedMenuItem}`}
            value={props.initialValue ? props.initialValue : null}
            onChange={(e) => onChangeValue(e)}
            MenuProps={MenuProps}
          >
            {props.isMixed && (
              <MenuItem key="Mixed" value="Mixed" disabled>
                Mixed
              </MenuItem>
            )}
            {props.listData.map((p) => (
              <MenuItem key={p.id} value={p.id} style={{ display: "flex" }}>
                <ListItemIcon>
                  <AppSVGIcon
                    icon={p.id}
                    width={25}
                    height={25}
                    color="rgba(60, 60, 65, 1)"
                  />
                </ListItemIcon>
                <ListItemText primary={p.label} />
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className={classes.message}>
          {error && (
            <Typography style={{ color: "maroon", fontSize: 8 }}>
              {errorMessage}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

IconListBox.propTypes = {
  validation: PropTypes.object,
  selectedElement: PropTypes.object,
  formKey: PropTypes.string,
  isStyle: PropTypes.bool,
  onValueChange: PropTypes.func,
  labelText: PropTypes.string,
  isInlineTextEnabled: PropTypes.bool,
  isInlineText: PropTypes.string,
  initialValue: PropTypes.any,
  maximumLength: PropTypes.number,
  error: PropTypes.any,
  listData: PropTypes.array,
  isMixed: PropTypes.bool,
};

export default IconListBox;
