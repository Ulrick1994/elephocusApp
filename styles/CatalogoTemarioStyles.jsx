import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center", 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6a11cb", 
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#f9f9f9", 
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
    // width: "80%", 
    width: "100%", 
    borderColor: "#6a11cb", 
    borderWidth: 1,
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignSelf: 'center', 
  },
  itemText: {
    fontSize: 18,
    color: "#6a11cb",
    fontWeight: "600",
  },
  bottomNavBar: { 
    
  },
});

export default styles;