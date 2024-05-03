import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SvgIcon from "@mui/joy/SvgIcon";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "@mui/joy/Table";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Progress2Marks from "../MarkShetsTable/Progress2Marks";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#d3dae3",
  borderRadius: "5px",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AssignMarksProgress2() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    const assignSection1 = document.getElementById("Assign1");
    if (assignSection1) {
      assignSection1.scrollIntoView({ behavior: "smooth" });
    }
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    const assignSection2 = document.getElementById("Assign2");
    if (assignSection2) {
      assignSection2.scrollIntoView({ behavior: "smooth" });
    }
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    const assignSection3 = document.getElementById("Assign3");
    if (assignSection3) {
      assignSection3.scrollIntoView({ behavior: "smooth" });
    }
    setAnchorEl(null);
  };
  const handleClose3 = () => {
    const assignSection4 = document.getElementById("Assign4");
    if (assignSection4) {
      assignSection4.scrollIntoView({ behavior: "smooth" });
    }
    setAnchorEl(null);
  };

  const [users, setUsers] = useState("");
  // const [marks, setMarks] = useState({});
  // const [errors, setErrors] = useState({});
  const groupID = localStorage.getItem("userid");
  console.log(groupID);

  const scrollToAssign = () => {
    const assignSection = document.getElementById("Assign");

    if (assignSection) {
      assignSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/student/getOneGroup/` + groupID
        );
        console.log(response.data.group);
        setUsers(response.data.group);

        toast.success("Group Detail's Fetched Successfully!", {
          duration: 2000, // 3 seconds
          position: "top-right", // You can change the position if needed
        });
      } catch (error) {
        console.error("Error fetching group data:", error.message);
      }
    };

    fetchGroupData();
  }, [groupID]);

  return (
    <Box sx={{ flexGrow: 1 }} margin={2}>
      <h4
        style={{
          padding: "10px",
          fontFamily: "monospace",
          backgroundColor: "#17376e",
          color: "white",
          fontWeight: "600",
          borderEndEndRadius: "40px",
        }}
      >
        Group Details...
      </h4>
      {users && (
        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <Item>
              {" "}
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  alignItems: "center",
                  overflow: { xs: "auto", sm: "initial" },
                }}
              >
                <Card
                  orientation="horizontal"
                  sx={{
                    width: "100%",
                    minHeight: "292px",
                    flexWrap: "wrap",
                    [`& > *`]: {
                      "--stack-point": "500px",
                      minWidth:
                        "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                    },
                    // make the card resizable for demo
                    overflow: "auto",
                    resize: "horizontal",
                  }}
                >
                  <AspectRatio
                    flex
                    ratio="1"
                    maxHeight={100}
                    sx={{ minWidth: 150 }}
                  >
                    <img
                      src="data:image/jpeg;base64,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"
                      srcSet="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhMREhMWFhUVFSEZGBcXGB0fFxoeGBoYGBwdGBobHikgGx0nHx4YIzMhJiorLi4uGx81ODMtNygtLisBCgoKDg0OGxAQGzUmICYtNy01Mi0tNS0tNy0tLy0rLy8tLzcvMS0tLy0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLf/AABEIAK4BIgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwcCAf/EAEkQAAICAQMCBAMFAwcICQUAAAECAxEABBIhBTEGEyJBMlFhFCNxgZEHQlIkM3ShscHRFRZUgpKys/AlNENEU3Jzk7RVYnXS0//EABkBAQADAQEAAAAAAAAAAAAAAAACAwQBBf/EAC4RAAICAQMCAwcEAwAAAAAAAAABAhEDEiExQVEEImETMnGBobHwQpHB8SMzYv/aAAwDAQACEQMRAD8A9wxjGAMYxgDGMYAxjGAMYxgDGMYAxjOcEyuCVNgMV/NWKkc/UHAOmQOp9a02mKjUTxxF7Kh2C3tq6vvVj9RnHU9LcuhjdVVOwYSsbsnkiZQfzB/uyq8W9MjlfR+ekcl6vYPRVI0cjFTZN2VUnsDQ44zqOMnf549O/wBM0/8A7q/45A6d+0Tp8zOvnCPb7y0ityR6STz2/syd/mf0/wD0SH/ZGRtb4a6akZk+zQ8j0kJu3E/CFUG2JNcA853ynPMSv88enf6bp/8A3V/xy4006yIsiMGR1DKwNggiwQfcEZg+peG4V0Mzy6SCOZWFGNK4LrX7xo0aPJF3VjNpKwgjVY4iUQbQqFFCKo4+NlAAAw66HU2TMZm+keM9POzKPuwpotJJCBf02yEn9MvdNrI5L8uRHrvtYGr+dHjOOLTpiMlJWjvjGM4dGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwBjGMAYxjAGfMjhQWN0BZoEnj5Acn8BkbXrMdnlFR6vVuF8fqOP6+2fuqeYEeWkbCuS8jKb/ARt/bgFX1TxDHCYpA/mJKGVYoxukdlo7kA9hyrbiALWyK5qtJ4jpfJeOXTNLMdkkoQoPNkLVujd1V6alD0C1d+2R+pROddMGqOSTSx+WQdygB5BJtsKSQxjJNA0U+QylEztpdS+pkDp5IXYFqy0MTiueXLNQA7k/gBojiTjZRLK1Kj06HVo7MisCU4auwPyJ7bvmO44vuMzfjjrEGnfQiV9v8AKfM+Fj6UjdWPpB7F0H55aaL7Wkca+VCxCLuJmZSW2jcSohIHqv3OTdZ06GajLFHIV7b0VqvvW4cdh+mULkuZktb420EzbH1FQAWwEUtyH+FvRxGPcfvXRpQQzTeK+kxvvWduL2KYpdke74jGvl+m/wDGqs3a63pWlLeTDpdOZCLZjChWNT+83HLH2X3/AABOZHwl4Llgm1Lyx6eZY2CCMhW38CU0WjUI+11o9ibBoUwmlGiLcrLTxN420EumljjmLM1UPKlHZ1J5KV2BzVzdTuGOeFTKsm0rtrlXohvUQeQf1IuhZEfSdJ0Eqh000BB+cKAgjghgVtWBsEHkEZbxRqoCqAqqKAAoADsAB2GQddCSs4jy0QuQsYrcxO0VQs7iOOOebrMj1bxyYpnjiijkRaqTzSA1qCapCOCa7+2d/F7TSahNMs8kUb6d2cRiMlvWiUS6NQpj2rI3kav/AOo6n/Y03/8ADLsUP1NWUZJ15U6Iy/tDlJCjTR2SAB5xvkgf+H9c3Oh1iyqSLBB2srcMjDurD59voQQQSCDnnEMjaxk0uqkieaSEGGYcNuXc5VgopJVBNrQDqpI9wJ37L3Jk1JYkkxxXZJ95vnkpwjKLlFVRyE5Rkoyd2eg4xjMxpGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwBnPUQh1KksAf4WZT8+GUgj8jlP4vXTGDbqp/IRnADmTZbC2AskA8Amj8r9spuldd0WnpV6npWjAC08pZqXjgtMVU/UKB9Mko7WQ1b10NbDo1V2kBe27gyOV/JGYqv5AZ2kWwQCRYqxVj6iwRf45C6X1vTancNPPFLsrd5bq23ddXR4uj+hz61fUFjdUIPqF3xQ5A55+oyLdclkYuWyM7470o0+j+0RC5NNIsisxZjTMqSeY3LFSha+/YH2GY79n2rbV6yOF/LaOEef8AdiSt8ccUEe/eqj5sBz6hfsM9Q6jPp5EeGUq6ujBkv4lK8jj6HKzoPTdHo/MaORmZqDNJIWYBbpfoAdx/GyTkllSi1ZF4ZNp0XWl0axlipamN7SxKg82VB+G/kOPpZN9Z4t6shJG5SLBoixVg+xyt13UW2v5UsIIYKu8MRfNhtp5PB7dqz60f2zcvmnT7P3tgfd29rNd84qfUSuOzTOfhnw5DoI2igL7Wfed7bjZAU1+gzl0Dw9p9JNO0TyF5aeQO5buz01exJ3C/p9Mvcpesumm+/jhDzyssSCwts5/eajtHuzUSQoFGgMW2KPzSeGII9ZJrlaTzZRT2/oIpRW2vbaK+WXeVPROqSStLFPGsc0JXcEffGVcEqysVU80wIKggj5Ucrk8TybhKYFGlbUfZxJ5n3u8y/Zwxi2VsMnp+O65rG7Gxx6//ANfi/or/APFiz9z88QH+Xxf0V/8AixZ+3mvF7iMeb32Q5z/LOnf0l/8A4mpyF+zSTa2qaiaji4UWfim7DJOtkI1XTyqlyNS3pUrZ/kupHG4gf15f+FvD6aVNwDCSSNBIC1gFQTQ9u7NnMk0lJd0vuSxwbcZdr+xZR64GvQ4tq5Ffn37ZKByJP0/T0WeKKhZJZFoe5Nkce5OOmzQOC8Owi9rFa/dFAGvpVfQiuDmQ1kzGMYAxjGAMYxgDGMYAxjGAMYxgDGMYAxjGAMYxgDIHXdU8UJeMgNvRQSLHrkRDxY9icn5V+IULwSKtFk2SFbFkI6vXPYkKwF8XnVycfBmuv6STVxiKWVRtbcjKhDI1FbUh++0sPwJyDp/DiqqqXLEAAsWltqFWamqzljHrw6b0SYjmj5MtcWD+78wRmZ0XXNRI2lB1mhCTwea8m0VC1A+WwOpBLc1fH4cGtfkRk87Lvw30qTR7yk255K3PIpZiFvavL9hbH/WOaXorGbzjNTMj+WCAQNpjiftuIu2PP0GZvpHVTJpo53R+Y9zMkMhj7WSpAPp+tnNJ4Vvy5ZaIWWUsoI9VKkcfI9iShNd6I9+MrzKNFuFzUtz9k0MO8o6+lUDbi5PxWg4+fHz+WfumOmajyGA3UCxIslq+ptu31+md9I0OpDSbG4YqdwZfgZgK7e9mu4sg0QQO7aGFV5AVRz3IAr378Zj0Psjd7VNbtnFelwSAtW4PTE2fUOav6c9sl6nUxxKDI6RrdAswUfhZOVUniXQwrt89CEFUhLkV8wlkfnlJ1H9pWnjry4Z5SeQQoVSPnbG6+tZbHFLlIonmT2cjVt1XThfMM0Wy63b122eQLur75jf2o9QYxwQRsNk4Zt60TcfltGVb2oncGWjYWjms6DrJ5ohJqIBAzG1j37mC+287RTH+H2/HgUvivwxFqH0ILyJ5bmNdhHwtGxNhgQT92vP45PE4xmnLgryqTg1Hk8/8KdVWFpE1uuniDR+bvU07yElfvH2s7MqKgCMSO/BrKvSa7UiRdUZmPaXbtXy/NYhS3lfzYa7JIF8975z66hBA80kavuRGRwXoOdy7vVVC9pA+lDLfoHRIdbp5SZpVb7QqEJtCgM8KWCVJ3ck96ze44oLW+HwYFPLN6FyuT0brvTIdVBHLLp4pXpNu+NWK+YybtpZTQyrfwxokcr/k/TtXH8whHIQ2TsF8kj882OmhCIqC6VQos2aAoWfc59vdGu9cZ5TT6M9aMklTVmb6L0fSpOWj0EETIPTKkSggkUQG2gg0SK+WXPVOorAoJ5ZjSIPiY/IfIe5PYDKbwgmoWNElSUOOdS07li8hUC4CGKiOwTQCgAj0gk5E8bSnS/ysU4fbFTnasZJO1i/ZIyfiv3qrNDLIRuVNleSW1xRe9H67DqRSOu9bDx7gWUqQG7HkAkc9uRkbxF12LQRD07ncny4lNF2Jsm/3VBNlva/ckA+c9P6DJHEuuiJRjKGiMaKJ595+8eKNgQIxGZPLiPf4mvjJut0uo10xgkMv2iFGeF2i8ultNyzKLQs9qQ6sUbawpCpyemOrfgrcpaduTf8Ahzr8Wsi8yO1ZTtkjb442+TfT3B7Ec5bZ4p4Jg6g2v+7TyzG1SSEER+UGIZGH/achtvuGB7Uc9rzmWMYy8rtHcUpSj5lTGMYyssGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwBlfqOmr99IoO94ytXx2bt+N/1e3N2GMAwnh7rmoAbTJppCYi24vE6j1OxoMTtbue3eryLqfDQk3yNpG85txDBTtUsW2+nfRq89FxliyU7SK3C+piOvdf1EUJR9K4WRSg8uJ3q1P7qnLLT9YTSQQxyJK0rhmEMaFpdu4ksVHZQCLJPcgCyQDpcpPEXQTqSkkc8mnlRWQSR7bKuULK1jtaKeCDx375xNPbg7TW/JNheLUwXE58uVTTxkqwsmyCKKsDd+93eec9Z8OrC8h1OoZ0jCkMUaSdw/mUPUdqkbHJY+mgSQo7ei9B6b9m08Wn3bvLXbuPdvmT9TkPqnTJn1MUsTIiiNg7EW4PZGQdiQrzj1cDcDTVRlDI4PysjPGsiWpHmEsycCKPbyApb7yZieBt42Ix7VGt32bNz4R8JeURqNSLlPqVCb2H5sed8n15r2vubnpvhnSwSebHH66qySaJvcVB4Un3Ir3+Zu4y3L4jUqgq79ynD4bS7m77dEvkMi6/SmTYVbayPuUkWLplNixYpj7j2yVjMprMDpulRx6yWKVIZimn0aKXiX4TLPETRJ9VAWfoOOMl+E+lE6aKTzEWO921Y64jnaUerdXJHJrt+uaLqfQtLqSpngjlKigXUEgHkgE+11xk6GFUVURQqqKVVFAAcAADgDJWRo46HXRzKWjYEAkH8j/eKI+YIPvnaUNXpIB+ZFjvzwCPa/fEcYUUoAFk0PmxJJ/Mkn88+8iSM1qPEBiepJCQQSAuh1BI7gWQxHB7ihY+V3lzoZ0niBPqBFNujKgkd/Q/IH0N5MxkrVEUne7MlMW0k7HaoD7vKZifLAILsln0wKu0yMOS/FfDtXPdf8Xzapkh0LNse1R4wA2pcbkbYGFCFGC7zvV6awQBbei9R0Ec8bQzIHRxTKf8RyD9RyMpekeD4dMXeKSUSOaMh2F9oAVUsoeAAvPxNQ3E1hNBpl7o0KxopVVIQAqnwCgOF4+Ee30ztmX650SaceX5kxUMGB3xC+COwjBHf55poxwL+WcaVWE3dUfWMYzhIYxjAGMYwBjGMAYxjAGMYwBjGMAzPjLUOhh2Oy3uvaSL+H5Zxdp9JLEGmMqyGiDfzA7Emu+dPGsTMYaBPxdhf8GQdT09tLPE5DSpd3RJ47/mO4zDk1a2/gezgUHhinW6ltXPz6EjxJO41KoJmjUqLIJoctzQOSdNK0WnnkSfzyKom/SffuT87/LIfiMfylHMbOmxSQAeRbcXlh02fdDMIINhHO17Ia+/f6Cs6v8AZL5/nYjNJYIbbbXxXPXqQOhzTtIjCcSA/GjNyBfNA/LvxnPqk7nVyJ57RJ89x2j0g9gfnnLp+nd54ikBiKNbkbgvB54btxxWfXVQBrJGeJpEscAHn0D3GV29C+Pr/Zeox9s+Pde23f8Ab4Gk6AlRfz3nWxIfn6CuSfcHKKTr5Gr3bj5QOyvau278b5v5ZLbqIXSN5UTRksUVeSRYst/WfzypXouq8nbsXafX7bu369vbLJzlSUPiUYMUNU5Za3db0vi+37Gl8TysunZlYqbXkGj8Q9xlBt1EcC6oahj29LEnua9yQckS6lpdAVKtvQqpFGyAwo/p/YcrtR0dxBHMCzWfUlH08kDj/nvnMsnJ6l2J+GhGENE2r11xd7cell71frjJBEyCnlWx77eBdfM8is4aTpuuDIxm4J9QLFqH1U8H8s/eraRtTBFLEpDIPg7EdrA+oI4+mfmk67qmZEMBPNNwwJ/XhfzyTfn899KoqjGsX+NK99V1fpyOva1o9XF62VNqlgCarc12B34zl1TqwfUQeTK23coYAsB8fuOL4z66/pt+shBUlSqg1dVua+R2zj1XpqxamARIQu5Sas/v/M3kZudyriyzEsNQvnS+1defU2OZXxB1SSDVAqfTsFoT6Ty3t7H65qsy3V4S2vitSVIUHix3a79svz3pVdzF4HTrepWqY6p4oBjAhsMw5JHwfT6n+rI+s1cg0MDiR9xkILbjZ+PufyGTOp9DiihmZFJZqr32jcvC5X62JjoIAFa/MPFG+8ntlE/aW9Xbp8TdhWBqPs1+vrzwyb0BCZEb7WZPTZjtvlXNmuCcrusw6iArunY7ya2u3FV/jlh4enj8xFXTMjFaLm64Fnv8yM+vGsbMYaBNbuwv+HDjeK1z8zkJteKUWtmuqXr2Pp9JPBppy8pYkDaQzEjnnk9u+R9L1lRpGRpT521qvduuzXq/T3y78QqTppABZodvxGUOk6RGdG0hjPmhWrlrsE16b/D2yU1KMqj2K8U8c8erLzrXFdvsSOndVaPRGViXbeVG4k8ntf07nIsen1zp9oEp5G4Luokd+Frb+Wd+n9NaXQmOqYOWF8cj/EWMjxdV1SR/Z/JbcBtDbTYHbt2P45B8LVdV07lqS1T9mlere649PQmjqzS6KV7qRKBK8e4oiu3H9+VsCavyftKysVFkgsSaBIJIPB7ZOj6W0OilDD1vRIHNURQ/HK/Ta6fyfsyRNzY3Ubpib9qHfviV7ar4+pLGo1L2SVa+tVVblrqetu2j81OHLbGI9vmR+PH658+HZJjIPvhLGVtgWtlJHyPPfj5Z2XQSwaQoqK7k7nUiwQe4AB5I4/Q5XdA0ztqVkWIxIq+oc0TRHG7nk0a9qyfm1xspSxvFk01Vvfb5evwNljGM2HkjGMYAxjGAMYxgDGMYAxjGAMYyG2pk85Y/LOwqSX4qxX1+tV3+XAOATMZ53446cNV1XQaZ2dUkhkvZV+kMwrcCO4HtmJ1Ok2s2kDvs/wArpBdjdtPmR3wK3V713yahZByo96xnhXijpw0T9SgikkKppYWBdgWttTp77AD5+3vl7o+hJouqdKEUkrCdJHfewPIhbtQHHPvftndHqc1nrGM+JZVWtzAWaFmrJ7AX7n5ZHHVILI86OxdjetiuTfPtRv8ADKyw6z6pEKh2CljQv3/D+rPuKVWAKkEHng/PPpWBAINg9iO2VHRvDkOmaRozJcjbiC523z+6KX3PcZ1JURd2qLjK/Xda08KNI8q7V+R3MSTQCqtlmJIAAFkkZ10/TkQ2GlP/AJppWHv7M5HvnjXQXSJ4ZxEsrxhRUiN5cZlkEcUgdFO1iysvI9+495whqTZGc9LSPWNH4iid/LdZIHK7lE67NyigSpsg1YsXYsWMtIZlflWDAfwkH+zPPOuaiXXoIJooB6gVkAmLRkfvJuiUbqsWTXPv2Nr+zaIIusUdl1LKPnS+kXX0Azrx1G2cWW5JI2WMhdO1UjmQSRGPa9LZHqFA3wT/AM/nnxrdZRv74bbBCQs1mhR+A3XsRwTxzlRaWGMoND19eFKatyT8T6Zlq+KNIAMl9VkEh+zoiSOaLbxujjHszg9z/Cvc/QWRJxa5IqSfBaYzDeLukjT9M1UQ5RpoyL9wZNOGsUALYMaAoXxXYRf2VxLGdaEUAAxml4/df+vJLHcHPs6IPJWRQrlWeh4yD07qSzEgAigG5/hb4T9CaPHtWTsrLRjGMAYxjAGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwDD9eP/TnTf8A0Zv9x8wuuP8AKm//ADyf78mbTxv9lOtiXVIjqdO21Xj32wkB4XaeavMX1v7LRESp5P2tF2rHS7vs8wI2be+72rvmnHC63M+SdXsSf2ln+U9U/ocH/wAjT5peqn/pXof/AKUn/BOYMrEseqCoEAijLjZt4+2aU8qQPa8tPCMcK9R0PlxhGMjH+bKEjyJvmosXWWywJJ+bj67FKz24+V7/AE3PbCMyHjDxPDppFgVJZtQ4oQwsQQCbBYrZBNHsCa9q5zX5594BVW6j1V5f+sCUgX3Ee9wNv4qsd/QJ9MxxS3bNkn0Oek8bNA8aa/SajSqzemRpXdLo8OWVfT7kC67kAc5vtVrI442mdgsaKXZyfSFAsm/lWVHjyKJun6vza2iFiPmHAtCv/wB2/bX1yD4P0f2npEMM17ZISlg02zcwQqfY7NpB/DOumrOK06NLodUJUWRQwDCwHRkb81YBl/MZ4j0vVRKIleOMsPJrdNIjvunZQEjX0yeWfXz889m6Z03yjveRpZSoQysFDFVLMoIQBeCzdh755N0EavZF5PneX93WzyfLvzT53m+Z95/N7a2e+W4eH8v5Ks3K+f8ABpdI8fmLWl2G+H8kivruMYr9ctP2e/8Aff6W/wDaciQLqtw3+Xtvmruvpxkv9nv/AH3+lv8A2nLMvuMqx++jX4znKrEjawA5sEXfHFc8Uec+dOrqPvHDG+4XaP0s5jNpE1mrZmMEHxj43q1iB5/NyOQv4E8VurJ/Emg0TnTySlXWme45GJLi9zOqEEn53nfxF1eWBoUgjjdpma97lVGxd12qsSfbtnlHXeptqZNVK6KjfAVViy3Huj4JAJB232HfL8OHW9+DPmzezW3O31K+Z22Rku53H1W7EGmB7E13z0X9mKgtrAeQTHY/1Xzzmf4If/N/eM9H/Zf8es/GP/dfNfiEliden2Mfh23lV/8AX3NxBpUSyqgE/wB/930ztjGeaeoMYxgDGMYAxjGAMYxgDGMYAxjGAMYxgDGMYAxjGAYnxh0zWnXaXWaSJZDDG6kMygW9jm3U9jfGZebwn1JgZvIXzj1FdVs3pt9Idv4+24gd7z17Is+lZu00ick+nZ7+3qQ8D2/vyam0RcUzy3q/hjqmsOtlm06I88EcaqsiUdk8LmvWa9KseTlr0/pXU5tfoNRqtPHHHpVdbR1PDRsvI3kk3t7fM5uY9YiyCAuWcgmzX04NAC657exyj/aN1ybSaUHTqTJI+wN/ANrMSLFb6WlBuyRwfhJSb2IuKW48Tdfl3PpNDtM4W3kbmOGxag8G5G9l5oepuKDY/onR5+oE6yJ30mshJjllJLLNIDyRXpAAABAsdlohFJneGYhrYkj0nmRabvPMb81mPxIjHlpSb3y81fFk+n0XQ6OOGNIokCIgpVUUAB8snKobLk5G5bvgwzeCtdqmUdS13mRKb8qIBQxHzIVAPxon5FTzm9hiVFVFACqAAB2AHAAHyrKvUakv5jtL5OnisM4oFtnxksbCIpteObU8gDnHv4sgeZYdGmqkcqW3NqJEG0e8azFlYk9gwUZCpSJXGJ6PmFi8I6D0j71VPCszKFNA9iRz2/Htl94d6z5wUFiwYNtYrte4zteOVRwsimu3DckChnd9LFuaPb6UTdW48b96kAewoHIOUocOi2MIT95X+f0UJ8G9PF+t+DXxj/8AXLTw/pdLpIJJI2Kx8u5c2F2jnsK7Czn4k2nA4WQFFBoXyGrgdiy9uSPYc5bafQoqlNtqe6tyOwHIP0Aziyzls3sdlhhBbKn8CB4X6+usjZguxkamQmyAeUP5rX0BDCzV59+K+nvqNJPAgUtIm0BjSn6E0aH5HM94PnWDpssw2Ky+YbNAErewN2vngD65p+j9RWZL3ozqSHCkWpDEURdg8e+WTSUnRTBtxVmC0ng7VRakaiHSaWJQoXykl2gkCUFrWEc+tR29sr5PAfUCZfRB96zMfvj6dzu1fzfNbvpnq2qWQgeUyKb5LoWFfgHWj9byu1U2ojrdNHz226WVu3z2ymvzycc01wQlhhLk84fwB1AhV2weg2D5p55sf9nx/Xmy8B9C1GmOoacIpkKbQjlvhDA2So+eajSsSiliCSASQpUH/VYkr+BN51xPPOSp/lCOCEXqX5YxjGUlwxjGAMYxgDGMYAxjGAMYxgDGMYAxjGAMYxgDGMYAxjGAfOwXuoWBV1zRokX8uB+mc9XpY5UaOVFdGFMjqGUj5EHg52xgHxDEqKFRQqjsFAAH4AYmlVFZ2IVVBJJ7ADkk/TIGv003HlG+STulKVdUBUTWO/yr65JaIyBklRdhAHDE3Y9V+kVR7EHnvxgGR8YaeQ9Lc7WAM3nOtHcI21BlO4fRSCw+jDPOdRE4kGpi1HklY637QRRJJNk1Wey6CQQzSad5SQ21olkazTAgqpb1OQyseSaDKOM5p4R0Cv5o0sQYHcPT6Qe9hfhB+tZqw+IUIuMlZlzeHc5KUXVFF4L0LpDpGlZ2nnmfUybqB2+S0QO0AbRtMFj+Js2cmljZtzIpaqsgE8fXIfRl3j7S3xTAFQf3Izyigexo23zYn2CgWWZpO2ao2uDgukjAICKAe9Ac/jmb13iJ5HZNO21KpZfKd1ckXuV+ECDtdmzfYVd31+Fn00yINxKEbR3Ye6j6kWPzzOxauNhaupH40R9CDyCPkeRluGEXyU5skkVXUulRJD6IgGClF2qts0imIBie9swNk/W++SXkKJI6qwmgdwpClje7dQ2WWQ2AwH1uiOJsjIwKsVIIogkcg8EZ8wmONQoYUPctZ+ZLMTZJNkk8kknNFGZSNbpNQsiK6EFWFgj+z8R2/LOPT0mBfzmVvV6dq1xX4nj6d+/PPEDwqCUlcD0SS7k+o2IpYD5Fg1fP4v3ry7zE1To3RdqxjGM4dGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwBjGMAYxjAGMYwCH1eAvC6qLarUfUEEEX7ggHJUg4P4Z9YwCN0uIpDEjCisagj5EKAck4xgFNptLONQzsTs9zvBBW5digbLtbv2/nB6m2C7KTRxsbaNCfmVBP6kZ3xgEb/J8P/hR/7C/4YGghHIij/wBgf4ZJxgDGMYAxjGAMYxgDGMYAxjGAMYxgDGMYAxjGAf/Z"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent>
                    <Typography fontSize="xl" fontWeight="lg" textAlign="left">
                      {users.groupId}
                    </Typography>
                    <Typography
                      level="body-sm"
                      fontWeight="lg"
                      textColor="gray"
                      textAlign="left"
                    >
                      {users.topic}
                    </Typography>
                    <br />

                    <Sheet
                      sx={{
                        bgcolor: "background.level1",
                        borderRadius: "sm",
                        p: 1.5,
                        my: 1.5,
                        display: "flex",
                        gap: 2,
                        "& > div": { flex: 1 },
                      }}
                    >
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Examiners
                        </Typography>
                        <Typography fontWeight="lg">
                          {users.ExaminerDetails.length}
                        </Typography>
                      </div>

                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Publication
                        </Typography>
                        <Typography fontWeight="lg">
                          {users.ExaminerDetails.length}
                        </Typography>
                      </div>

                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Members
                        </Typography>
                        <Typography fontWeight="lg">
                          {users.members.length}
                        </Typography>
                      </div>
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Total Marks
                        </Typography>
                        <Typography fontWeight="lg">85%</Typography>
                      </div>
                    </Sheet>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        "& > button": { flex: 1 },
                      }}
                    >
                      <br />
                      <br />

                      <Button variant="outlined" color="neutral">
                        Contact
                      </Button>
                      <Button
                        onClick={scrollToAssign}
                        variant="solid"
                        color="primary"
                      >
                        Assign
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item>
              {" "}
              <Row>
                <Col>
                  <Card
                    sx={{
                      width: 320,
                      maxWidth: "100%",
                      boxShadow: "lg",
                    }}
                  >
                    <CardContent
                      sx={{ alignItems: "center", textAlign: "center" }}
                    >
                      <Avatar
                        src="/static/images/avatar/1.jpg"
                        sx={{ "--Avatar-size": "4rem" }}
                      />
                      <Chip
                        size="sm"
                        variant="soft"
                        color="primary"
                        sx={{
                          mt: -1,
                          mb: 1,
                          border: "3px solid",
                          borderColor: "background.surface",
                        }}
                      >
                        Superviser
                      </Chip>
                      <Typography level="title-lg">
                        {users.supervisor}
                      </Typography>
                      <Typography level="title-lg">
                        {users.SupervisorDetails.Email}
                      </Typography>
                      <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                        Hello,As a Seasoned leader, adept at guiding teams to
                        success. Detail-oriented with strategic mindset.
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mt: 2,
                          "& > button": { borderRadius: "2rem" },
                        }}
                      >
                        <IconButton size="sm" variant="plain" color="neutral">
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
                              />
                            </svg>
                          </SvgIcon>
                        </IconButton>
                        <IconButton size="sm" variant="plain" color="neutral">
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M12 6.865A5.135 5.135 0 1 0 17.135 12A5.135 5.135 0 0 0 12 6.865Zm0 8.469A3.334 3.334 0 1 1 15.334 12A3.333 3.333 0 0 1 12 15.334Z"
                              />
                              <path
                                fill="currentColor"
                                d="M21.94 7.877a7.333 7.333 0 0 0-.465-2.427a4.918 4.918 0 0 0-1.153-1.772a4.894 4.894 0 0 0-1.77-1.153a7.323 7.323 0 0 0-2.428-.464C15.058 2.012 14.717 2 12.001 2s-3.057.011-4.123.06a7.333 7.333 0 0 0-2.428.465a4.905 4.905 0 0 0-1.77 1.153A4.886 4.886 0 0 0 2.525 5.45a7.333 7.333 0 0 0-.464 2.427c-.05 1.066-.06 1.407-.06 4.123s.01 3.057.06 4.123a7.334 7.334 0 0 0 .464 2.427a4.888 4.888 0 0 0 1.154 1.772a4.917 4.917 0 0 0 1.771 1.153a7.338 7.338 0 0 0 2.428.464C8.944 21.988 9.285 22 12 22s3.057-.011 4.123-.06a7.333 7.333 0 0 0 2.427-.465a5.113 5.113 0 0 0 2.925-2.925a7.316 7.316 0 0 0 .465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.057-.06-4.123Zm-1.8 8.164a5.549 5.549 0 0 1-.343 1.857a3.311 3.311 0 0 1-1.898 1.898a5.522 5.522 0 0 1-1.857.344c-1.055.048-1.371.058-4.042.058s-2.986-.01-4.04-.058a5.526 5.526 0 0 1-1.857-.344a3.108 3.108 0 0 1-1.15-.748a3.085 3.085 0 0 1-.748-1.15a5.521 5.521 0 0 1-.344-1.857c-.048-1.054-.058-1.37-.058-4.04s.01-2.987.058-4.042a5.563 5.563 0 0 1 .344-1.857a3.107 3.107 0 0 1 .748-1.15a3.082 3.082 0 0 1 1.15-.748A5.523 5.523 0 0 1 7.96 3.86C9.014 3.81 9.331 3.8 12 3.8s2.987.011 4.042.059a5.564 5.564 0 0 1 1.857.344a3.31 3.31 0 0 1 1.898 1.898a5.523 5.523 0 0 1 .344 1.857c.048 1.055.058 1.37.058 4.041s-.01 2.986-.058 4.041ZM17.339 5.462Z"
                              />
                            </svg>
                          </SvgIcon>
                        </IconButton>
                        <IconButton size="sm" variant="plain" color="neutral">
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M22.212 5.656a8.384 8.384 0 0 1-2.401.658A4.195 4.195 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.621-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.169 4.169 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102a4.205 4.205 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.394 8.394 0 0 1-6.192 1.732a11.831 11.831 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9c0-.18-.004-.362-.012-.541a8.497 8.497 0 0 0 2.086-2.164Z"
                              />
                            </svg>
                          </SvgIcon>
                        </IconButton>
                        <IconButton size="sm" variant="plain" color="neutral">
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19.989 11.572a7.96 7.96 0 0 0-1.573-4.351a9.757 9.757 0 0 1-.92.87a13.156 13.156 0 0 1-3.313 2.01c.167.35.32.689.455 1.009v.003c.027.061.05.118.094.229l.017.04c1.513-.17 3.109-.107 4.656.103c.206.027.4.056.584.087Zm-9.385-7.45a46.15 46.15 0 0 1 2.692 4.27c1.223-.482 2.234-1.09 3.048-1.767c.33-.274.594-.532.796-.755A7.968 7.968 0 0 0 12 4c-.476 0-.942.042-1.396.121ZM4.253 9.997a29.21 29.21 0 0 0 2.04-.123a31.53 31.53 0 0 0 4.862-.822a54.36 54.36 0 0 0-2.7-4.227a8.018 8.018 0 0 0-4.202 5.172Zm1.53 7.038a14.21 14.21 0 0 1 1.575-1.899c1.454-1.49 3.17-2.65 5.156-3.29l.062-.018c-.165-.364-.32-.689-.476-.995c-1.836.535-3.77.869-5.697 1.042c-.94.085-1.783.122-2.403.128a7.966 7.966 0 0 0 1.784 5.032Zm9.221 2.38a35.951 35.951 0 0 0-1.632-5.709c-2 .727-3.596 1.79-4.829 3.058a9.77 9.77 0 0 0-1.317 1.655A7.964 7.964 0 0 0 12 20a7.977 7.977 0 0 0 3.005-.583Zm1.874-1.075a7.998 7.998 0 0 0 2.987-4.87c-.34-.085-.771-.17-1.245-.236a12.025 12.025 0 0 0-3.18-.033a39.39 39.39 0 0 1 1.438 5.14ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Z"
                              />
                            </svg>
                          </SvgIcon>
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
            </Item>
          </Grid>
          <Grid item xs={6} md={3}>
            <Item>
              {" "}
              <Row>
                <Col>
                  <Card
                    sx={{
                      width: 320,
                      maxWidth: "100%",
                      boxShadow: "lg",
                    }}
                  >
                    <CardContent
                      sx={{ alignItems: "center", textAlign: "center" }}
                    >
                      <Avatar
                        src="/static/images/avatar/1.jpg"
                        sx={{ "--Avatar-size": "4rem" }}
                      />
                      <Chip
                        size="sm"
                        variant="soft"
                        color="primary"
                        sx={{
                          mt: -1,
                          mb: 1,
                          border: "3px solid",
                          borderColor: "background.surface",
                        }}
                      >
                        Co-Superviser
                      </Chip>
                      <Typography level="title-lg">
                        {users.coSupervisor}
                      </Typography>
                      <Typography level="title-lg">
                        {users.CoSupervisorDetails.Email}
                      </Typography>

                      <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                        Hello,Project management expert, thrives in teamwork.
                        Facilitates productivity with problem-solving skills.
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mt: 2,
                          "& > button": { borderRadius: "2rem" },
                        }}
                      >
                        <IconButton size="sm" variant="plain" color="neutral">
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
                              />
                            </svg>
                          </SvgIcon>
                        </IconButton>
                        <IconButton size="sm" variant="plain" color="neutral">
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M12 6.865A5.135 5.135 0 1 0 17.135 12A5.135 5.135 0 0 0 12 6.865Zm0 8.469A3.334 3.334 0 1 1 15.334 12A3.333 3.333 0 0 1 12 15.334Z"
                              />
                              <path
                                fill="currentColor"
                                d="M21.94 7.877a7.333 7.333 0 0 0-.465-2.427a4.918 4.918 0 0 0-1.153-1.772a4.894 4.894 0 0 0-1.77-1.153a7.323 7.323 0 0 0-2.428-.464C15.058 2.012 14.717 2 12.001 2s-3.057.011-4.123.06a7.333 7.333 0 0 0-2.428.465a4.905 4.905 0 0 0-1.77 1.153A4.886 4.886 0 0 0 2.525 5.45a7.333 7.333 0 0 0-.464 2.427c-.05 1.066-.06 1.407-.06 4.123s.01 3.057.06 4.123a7.334 7.334 0 0 0 .464 2.427a4.888 4.888 0 0 0 1.154 1.772a4.917 4.917 0 0 0 1.771 1.153a7.338 7.338 0 0 0 2.428.464C8.944 21.988 9.285 22 12 22s3.057-.011 4.123-.06a7.333 7.333 0 0 0 2.427-.465a5.113 5.113 0 0 0 2.925-2.925a7.316 7.316 0 0 0 .465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.057-.06-4.123Zm-1.8 8.164a5.549 5.549 0 0 1-.343 1.857a3.311 3.311 0 0 1-1.898 1.898a5.522 5.522 0 0 1-1.857.344c-1.055.048-1.371.058-4.042.058s-2.986-.01-4.04-.058a5.526 5.526 0 0 1-1.857-.344a3.108 3.108 0 0 1-1.15-.748a3.085 3.085 0 0 1-.748-1.15a5.521 5.521 0 0 1-.344-1.857c-.048-1.054-.058-1.37-.058-4.04s.01-2.987.058-4.042a5.563 5.563 0 0 1 .344-1.857a3.107 3.107 0 0 1 .748-1.15a3.082 3.082 0 0 1 1.15-.748A5.523 5.523 0 0 1 7.96 3.86C9.014 3.81 9.331 3.8 12 3.8s2.987.011 4.042.059a5.564 5.564 0 0 1 1.857.344a3.31 3.31 0 0 1 1.898 1.898a5.523 5.523 0 0 1 .344 1.857c.048 1.055.058 1.37.058 4.041s-.01 2.986-.058 4.041ZM17.339 5.462Z"
                              />
                            </svg>
                          </SvgIcon>
                        </IconButton>
                        <IconButton size="sm" variant="plain" color="neutral">
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M22.212 5.656a8.384 8.384 0 0 1-2.401.658A4.195 4.195 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.621-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.169 4.169 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102a4.205 4.205 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.394 8.394 0 0 1-6.192 1.732a11.831 11.831 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9c0-.18-.004-.362-.012-.541a8.497 8.497 0 0 0 2.086-2.164Z"
                              />
                            </svg>
                          </SvgIcon>
                        </IconButton>
                        <IconButton size="sm" variant="plain" color="neutral">
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19.989 11.572a7.96 7.96 0 0 0-1.573-4.351a9.757 9.757 0 0 1-.92.87a13.156 13.156 0 0 1-3.313 2.01c.167.35.32.689.455 1.009v.003c.027.061.05.118.094.229l.017.04c1.513-.17 3.109-.107 4.656.103c.206.027.4.056.584.087Zm-9.385-7.45a46.15 46.15 0 0 1 2.692 4.27c1.223-.482 2.234-1.09 3.048-1.767c.33-.274.594-.532.796-.755A7.968 7.968 0 0 0 12 4c-.476 0-.942.042-1.396.121ZM4.253 9.997a29.21 29.21 0 0 0 2.04-.123a31.53 31.53 0 0 0 4.862-.822a54.36 54.36 0 0 0-2.7-4.227a8.018 8.018 0 0 0-4.202 5.172Zm1.53 7.038a14.21 14.21 0 0 1 1.575-1.899c1.454-1.49 3.17-2.65 5.156-3.29l.062-.018c-.165-.364-.32-.689-.476-.995c-1.836.535-3.77.869-5.697 1.042c-.94.085-1.783.122-2.403.128a7.966 7.966 0 0 0 1.784 5.032Zm9.221 2.38a35.951 35.951 0 0 0-1.632-5.709c-2 .727-3.596 1.79-4.829 3.058a9.77 9.77 0 0 0-1.317 1.655A7.964 7.964 0 0 0 12 20a7.977 7.977 0 0 0 3.005-.583Zm1.874-1.075a7.998 7.998 0 0 0 2.987-4.87c-.34-.085-.771-.17-1.245-.236a12.025 12.025 0 0 0-3.18-.033a39.39 39.39 0 0 1 1.438 5.14ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Z"
                              />
                            </svg>
                          </SvgIcon>
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
            </Item>
          </Grid>
        </Grid>
      )}

      <br />

      <h4
        id="Assign"
        style={{
          padding: "10px",
          fontFamily: "monospace",
          backgroundColor: "#17376e",
          color: "white",
          fontWeight: "600",
          borderEndEndRadius: "40px",
        }}
      >
        Mamber Details...
      </h4>

      <Table hoverRow>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Full Name</th>
            <th style={{ width: "25%" }}>Registration Number</th>
            <th style={{ width: "25%" }}>Email&nbsp;(.com)</th>
            <th style={{ width: "25%" }}>Specialization</th>
            <th style={{ width: "25%" }}>Phone&nbsp;(+94)</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "left" }}>
          {users.members &&
            users.members.map((row, index) => (
              <tr key={index}>
                <td style={{ width: "25%" }}>{row.nameAsRegistered}</td>
                <td style={{ width: "25%" }}>{row.ITNumber}</td>
                <td style={{ width: "25%" }}>{row.email.slice(0, 20)}</td>
                <td style={{ width: "35%" }}>{row.specialization}</td>
                <td style={{ width: "25%" }}>{row.phone}</td>
              </tr>
            ))}
          <tr>
            {" "}
            <td>
              {" "}
              <div>
                <Button
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  Member List
                </Button>

                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  {users && (
                    <MenuItem onClick={handleClose}>
                      {users.members[0].ITNumber}
                    </MenuItem>
                  )}
                  {users && (
                    <MenuItem onClick={handleClose1}>
                      {users.members[1].ITNumber}
                    </MenuItem>
                  )}
                  {users && (
                    <MenuItem onClick={handleClose2}>
                      {users.members[2].ITNumber}
                    </MenuItem>
                  )}
                  {users && (
                    <MenuItem onClick={handleClose3}>
                      {users.members[3].ITNumber}
                    </MenuItem>
                  )}
                </Menu>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <br />
      <br />
      <br />

      {users && (
        <div id="Assign1">
          <h5
            style={{
              padding: "5px",
              fontFamily: "monospace",
              backgroundColor: "#17376e",
              color: "white",
              fontWeight: "600",
              borderEndEndRadius: "20px",
              borderEndStartRadius: "10px",
            }}
          >
            {users.members[0].ITNumber} Mark-Sheet
          </h5>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Item>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    boxShadow: "lg",
                  }}
                >
                  <CardContent
                    sx={{ alignItems: "center", textAlign: "center" }}
                  >
                    <Avatar
                      src="/static/images/avatar/1.jpg"
                      sx={{ "--Avatar-size": "4rem" }}
                    />
                    <Chip
                      size="sm"
                      variant="soft"
                      color="primary"
                      sx={{
                        mt: -1,
                        mb: 1,
                        border: "3px solid",
                        borderColor: "background.surface",
                      }}
                    >
                      {users.members[0].ITNumber}
                    </Chip>
                    <Typography level="title-lg" color="dark" variant="soft">
                      {users.members[0].nameAsRegistered}
                    </Typography>
                    <Typography
                      level="title-lg"
                      sx={{ fontSize: "14px" }}
                      color="primary"
                      variant="soft"
                    >
                      {users.members[0].email}
                    </Typography>

                    <Typography
                      level="body-sm"
                      sx={{ maxWidth: "34ch", textAlign: "left" }}
                    >
                      <br />
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: "15px",
                          fontWeight: "800",
                        }}
                      >
                        Functinal Description :
                      </Typography>{" "}
                      <br />
                      Hello,Project management expert, thrives in teamwork.
                      Facilitates productivity with problem-solving skills.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        "& > button": { borderRadius: "2rem" },
                      }}
                    >
                      <IconButton size="sm" variant="plain" color="neutral">
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.82-.258.82-.577 0-.285-.012-1.04-.015-2.037-3.338.724-4.042-1.5-4.042-1.5-.546-1.386-1.333-1.755-1.333-1.755-1.089-.742.082-.726.082-.726 1.205.085 1.838 1.24 1.838 1.24 1.07 1.83 2.809 1.303 3.49.998.108-.78.417-1.303.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.223-.124-.302-.536-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.49 11.49 0 0 1 3-.397c1.017.004 2.042.136 3 .397 2.292-1.552 3.297-1.23 3.297-1.23.657 1.652.244 2.874.12 3.176.77.844 1.232 1.913 1.232 3.223 0 4.61-2.806 5.624-5.478 5.917.43.37.815 1.104.815 2.226 0 1.608-.015 2.902-.015 3.297 0 .319.215.693.825.575C20.568 21.794 24 17.303 24 12c0-6.627-5.373-12-12-12"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                      <IconButton size="sm" variant="plain" color="neutral">
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M4.75 0A2.75 2.75 0 0 0 2 2.75v18.5A2.75 2.75 0 0 0 4.75 24h14.5A2.75 2.75 0 0 0 22 21.25V2.75A2.75 2.75 0 0 0 19.25 0H4.75zm4.667 19H7.916V9.5h1.5v9.5zm-.75-11c-.966 0-1.75-.784-1.75-1.75S7.75 4.5 8.716 4.5 10.466 5.284 10.466 6.25 9.682 8 8.716 8zm10.416 11h-1.501V13.87c0-.417-.002-.945-.584-.945-.585 0-.672.457-.672.93V19h-1.5V9.5h1.418v1.243h.018c.198-.375.682-.77 1.4-.77 1.5 0 1.774.988 1.774 2.272V19z"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={6} md={8}>
              <Item>
                <Progress2Marks
                  studentId={users.members[0].ITNumber}
                  groupId={users._id}
                />
              </Item>
            </Grid>
          </Grid>
        </div>
      )}

      <br />
      <br />
      {users && (
        <div id="Assign2">
          <h5
            style={{
              padding: "5px",
              fontFamily: "monospace",
              backgroundColor: "#17376e",
              color: "white",
              fontWeight: "600",
              borderEndEndRadius: "20px",
              borderEndStartRadius: "10px",
            }}
          >
            {users.members[1].ITNumber} Mark-Sheet
          </h5>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Item>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    boxShadow: "lg",
                  }}
                >
                  <CardContent
                    sx={{ alignItems: "center", textAlign: "center" }}
                  >
                    <Avatar
                      src="/static/images/avatar/1.jpg"
                      sx={{ "--Avatar-size": "4rem" }}
                    />
                    <Chip
                      size="sm"
                      variant="soft"
                      color="primary"
                      sx={{
                        mt: -1,
                        mb: 1,
                        border: "3px solid",
                        borderColor: "background.surface",
                      }}
                    >
                      {users.members[1].ITNumber}
                    </Chip>
                    <Typography level="title-lg" color="dark" variant="soft">
                      {users.members[1].nameAsRegistered}
                    </Typography>
                    <Typography
                      level="title-lg"
                      sx={{ fontSize: "14px" }}
                      color="primary"
                      variant="soft"
                    >
                      {users.members[1].email}
                    </Typography>

                    <Typography
                      level="body-sm"
                      sx={{ maxWidth: "34ch", textAlign: "left" }}
                    >
                      <br />
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: "15px",
                          fontWeight: "800",
                        }}
                      >
                        Functinal Description :
                      </Typography>{" "}
                      <br />
                      Hello,Project management expert, thrives in teamwork.
                      Facilitates productivity with problem-solving skills.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        "& > button": { borderRadius: "2rem" },
                      }}
                    >
                      <IconButton size="sm" variant="plain" color="neutral">
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.82-.258.82-.577 0-.285-.012-1.04-.015-2.037-3.338.724-4.042-1.5-4.042-1.5-.546-1.386-1.333-1.755-1.333-1.755-1.089-.742.082-.726.082-.726 1.205.085 1.838 1.24 1.838 1.24 1.07 1.83 2.809 1.303 3.49.998.108-.78.417-1.303.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.223-.124-.302-.536-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.49 11.49 0 0 1 3-.397c1.017.004 2.042.136 3 .397 2.292-1.552 3.297-1.23 3.297-1.23.657 1.652.244 2.874.12 3.176.77.844 1.232 1.913 1.232 3.223 0 4.61-2.806 5.624-5.478 5.917.43.37.815 1.104.815 2.226 0 1.608-.015 2.902-.015 3.297 0 .319.215.693.825.575C20.568 21.794 24 17.303 24 12c0-6.627-5.373-12-12-12"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                      <IconButton size="sm" variant="plain" color="neutral">
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M4.75 0A2.75 2.75 0 0 0 2 2.75v18.5A2.75 2.75 0 0 0 4.75 24h14.5A2.75 2.75 0 0 0 22 21.25V2.75A2.75 2.75 0 0 0 19.25 0H4.75zm4.667 19H7.916V9.5h1.5v9.5zm-.75-11c-.966 0-1.75-.784-1.75-1.75S7.75 4.5 8.716 4.5 10.466 5.284 10.466 6.25 9.682 8 8.716 8zm10.416 11h-1.501V13.87c0-.417-.002-.945-.584-.945-.585 0-.672.457-.672.93V19h-1.5V9.5h1.418v1.243h.018c.198-.375.682-.77 1.4-.77 1.5 0 1.774.988 1.774 2.272V19z"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={6} md={8}>
              <Item>
                <Progress2Marks
                  studentId={users.members[1].ITNumber}
                  groupId={users._id}
                />
              </Item>
            </Grid>
          </Grid>
        </div>
      )}
      <br />
      <br />
      {users && (
        <div id="Assign3">
          <h5
            style={{
              padding: "5px",
              fontFamily: "monospace",
              backgroundColor: "#17376e",
              color: "white",
              fontWeight: "600",
              borderEndEndRadius: "20px",
              borderEndStartRadius: "10px",
            }}
          >
            {users.members[2].ITNumber} Mark-Sheet
          </h5>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Item>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    boxShadow: "lg",
                  }}
                >
                  <CardContent
                    sx={{ alignItems: "center", textAlign: "center" }}
                  >
                    <Avatar
                      src="/static/images/avatar/1.jpg"
                      sx={{ "--Avatar-size": "4rem" }}
                    />
                    <Chip
                      size="sm"
                      variant="soft"
                      color="primary"
                      sx={{
                        mt: -1,
                        mb: 1,
                        border: "3px solid",
                        borderColor: "background.surface",
                      }}
                    >
                      {users.members[2].ITNumber}
                    </Chip>
                    <Typography level="title-lg" color="dark" variant="soft">
                      {users.members[2].nameAsRegistered}
                    </Typography>
                    <Typography
                      level="title-lg"
                      sx={{ fontSize: "14px" }}
                      color="primary"
                      variant="soft"
                    >
                      {users.members[2].email}
                    </Typography>

                    <Typography
                      level="body-sm"
                      sx={{ maxWidth: "34ch", textAlign: "left" }}
                    >
                      <br />
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: "15px",
                          fontWeight: "800",
                        }}
                      >
                        Functinal Description :
                      </Typography>{" "}
                      <br />
                      Hello,Project management expert, thrives in teamwork.
                      Facilitates productivity with problem-solving skills.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        "& > button": { borderRadius: "2rem" },
                      }}
                    >
                      <IconButton size="sm" variant="plain" color="neutral">
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.82-.258.82-.577 0-.285-.012-1.04-.015-2.037-3.338.724-4.042-1.5-4.042-1.5-.546-1.386-1.333-1.755-1.333-1.755-1.089-.742.082-.726.082-.726 1.205.085 1.838 1.24 1.838 1.24 1.07 1.83 2.809 1.303 3.49.998.108-.78.417-1.303.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.223-.124-.302-.536-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.49 11.49 0 0 1 3-.397c1.017.004 2.042.136 3 .397 2.292-1.552 3.297-1.23 3.297-1.23.657 1.652.244 2.874.12 3.176.77.844 1.232 1.913 1.232 3.223 0 4.61-2.806 5.624-5.478 5.917.43.37.815 1.104.815 2.226 0 1.608-.015 2.902-.015 3.297 0 .319.215.693.825.575C20.568 21.794 24 17.303 24 12c0-6.627-5.373-12-12-12"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                      <IconButton size="sm" variant="plain" color="neutral">
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M4.75 0A2.75 2.75 0 0 0 2 2.75v18.5A2.75 2.75 0 0 0 4.75 24h14.5A2.75 2.75 0 0 0 22 21.25V2.75A2.75 2.75 0 0 0 19.25 0H4.75zm4.667 19H7.916V9.5h1.5v9.5zm-.75-11c-.966 0-1.75-.784-1.75-1.75S7.75 4.5 8.716 4.5 10.466 5.284 10.466 6.25 9.682 8 8.716 8zm10.416 11h-1.501V13.87c0-.417-.002-.945-.584-.945-.585 0-.672.457-.672.93V19h-1.5V9.5h1.418v1.243h.018c.198-.375.682-.77 1.4-.77 1.5 0 1.774.988 1.774 2.272V19z"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={6} md={8}>
              <Item>
                <Progress2Marks
                  studentId={users.members[2].ITNumber}
                  groupId={users._id}
                />
              </Item>
            </Grid>
          </Grid>
        </div>
      )}
      <br />
      <br />
      {users && (
        <div id="Assign4">
          <h5
            style={{
              padding: "5px",
              fontFamily: "monospace",
              backgroundColor: "#17376e",
              color: "white",
              fontWeight: "600",
              borderEndEndRadius: "20px",
              borderEndStartRadius: "10px",
            }}
          >
            {users.members[3].ITNumber} Mark-Sheet
          </h5>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Item>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    boxShadow: "lg",
                  }}
                >
                  <CardContent
                    sx={{ alignItems: "center", textAlign: "center" }}
                  >
                    <Avatar
                      src="/static/images/avatar/1.jpg"
                      sx={{ "--Avatar-size": "4rem" }}
                    />
                    <Chip
                      size="sm"
                      variant="soft"
                      color="primary"
                      sx={{
                        mt: -1,
                        mb: 1,
                        border: "3px solid",
                        borderColor: "background.surface",
                      }}
                    >
                      {users.members[3].ITNumber}
                    </Chip>
                    <Typography level="title-lg" color="dark" variant="soft">
                      {users.members[3].nameAsRegistered}
                    </Typography>
                    <Typography
                      level="title-lg"
                      sx={{ fontSize: "14px" }}
                      color="primary"
                      variant="soft"
                    >
                      {users.members[3].email}
                    </Typography>

                    <Typography
                      level="body-sm"
                      sx={{ maxWidth: "34ch", textAlign: "left" }}
                    >
                      <br />
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: "15px",
                          fontWeight: "800",
                        }}
                      >
                        Functinal Description :
                      </Typography>{" "}
                      <br />
                      Hello,Project management expert, thrives in teamwork.
                      Facilitates productivity with problem-solving skills.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        "& > button": { borderRadius: "2rem" },
                      }}
                    >
                      <IconButton size="sm" variant="plain" color="neutral">
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.82-.258.82-.577 0-.285-.012-1.04-.015-2.037-3.338.724-4.042-1.5-4.042-1.5-.546-1.386-1.333-1.755-1.333-1.755-1.089-.742.082-.726.082-.726 1.205.085 1.838 1.24 1.838 1.24 1.07 1.83 2.809 1.303 3.49.998.108-.78.417-1.303.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.223-.124-.302-.536-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.49 11.49 0 0 1 3-.397c1.017.004 2.042.136 3 .397 2.292-1.552 3.297-1.23 3.297-1.23.657 1.652.244 2.874.12 3.176.77.844 1.232 1.913 1.232 3.223 0 4.61-2.806 5.624-5.478 5.917.43.37.815 1.104.815 2.226 0 1.608-.015 2.902-.015 3.297 0 .319.215.693.825.575C20.568 21.794 24 17.303 24 12c0-6.627-5.373-12-12-12"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                      <IconButton size="sm" variant="plain" color="neutral">
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M4.75 0A2.75 2.75 0 0 0 2 2.75v18.5A2.75 2.75 0 0 0 4.75 24h14.5A2.75 2.75 0 0 0 22 21.25V2.75A2.75 2.75 0 0 0 19.25 0H4.75zm4.667 19H7.916V9.5h1.5v9.5zm-.75-11c-.966 0-1.75-.784-1.75-1.75S7.75 4.5 8.716 4.5 10.466 5.284 10.466 6.25 9.682 8 8.716 8zm10.416 11h-1.501V13.87c0-.417-.002-.945-.584-.945-.585 0-.672.457-.672.93V19h-1.5V9.5h1.418v1.243h.018c.198-.375.682-.77 1.4-.77 1.5 0 1.774.988 1.774 2.272V19z"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={6} md={8}>
              <Item>
                <Progress2Marks
                  studentId={users.members[3].ITNumber}
                  groupId={users._id}
                />
              </Item>
            </Grid>
          </Grid>
        </div>
      )}
    </Box>
  );
}
