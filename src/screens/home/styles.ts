import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Estilos originais
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  startButton: {
    backgroundColor: "#3498db",    padding: 20,
    borderRadius: 10,
  },
  startText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  aboutContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    // marginTop: 10,
    // height: 300
  },
  image: {
    width: 128,
    height: 128,
    marginTop: 20,
  },

  appBgColor: {
    minHeight: "100%",
    minWidth: "100%",
  },
  home: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: '100%', 
  },
  h1: {
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 20,
    color: "#ffffff",
  },
  h2: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 20,
    color: "#ffffff",
  },
  h3: {
    fontWeight: "500",
    color: "#ffffff",
    lineHeight: 1.2,
  },
  h4: {
    fontWeight: "500",
    color: "#ffffff",
    lineHeight: 1.2,
  },
  h5: {
    fontWeight: "500",
    color: "#ffffff",
    lineHeight: 1.2,
  },
  h6: {
    fontWeight: "500",
    color: "#ffffff",
    lineHeight: 1.2,
  },
  p: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 0,
    // lineHeight: 1.9,
  },
  padding100: {
    padding: 100,
  },
  padding50: {
    padding: 50,
  },
  padding10: {
    padding: 10,
  },
  padding20: {
    padding: 20,
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
  paddingTop50: {
    paddingTop: 50,
  },
  paddingRight20: {
    marginRight: 50,
    width: "100%",
  },
  questionList: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  helpButton: {
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    borderWidth: 0,
    display: "flex",
    alignItems: "center",
  },
  helpButtonDisabled: {
    opacity: 0.5,
  },
  buttonIcon: {
    marginRight: 10,
  },
  choiceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  choiceLetter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3f51b5",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  choiceCard: {
    flexGrow: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  choiceCardSelected: {
    backgroundColor: "#e0f7fa",
  },
  homeStart: {
    backgroundColor: "#e70707",
    borderRadius: 8,
    textAlign: "center",
    justifyContent: 'center',
    paddingLeft: 30,  
    paddingRight: 30,  
    paddingTop: 10,  
    paddingBottom: 10,  
    fontSize: 20, 
    fontWeight: "600",
    color: "#ffffff",
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default styles;