import { Colors } from "@/constants/colors";
import { products, ProductsTypes } from "@/constants/saleProducts";
import { formatMoney } from "@/utils/productUtils";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenBackground from "./components/ScreenBackground";

const BORDER_RADIUS = 12;

export default function Create() {
  function buyProduct(product: ProductsTypes) {
    router.push({
      pathname: "/SalesRecord",
      params: {
        name: product.name,
        value: product.value,
        id: product.id.toString(),
      },
    });
  }
  return (
    <ScreenBackground
      headerColor={Colors.dark}
      useBackAction
      bodyColor={Colors.lightGray}
    >
      <Text style={styles.title}>Selecionar Produto</Text>
      <Text style={styles.subTitle}>Escolha o produto vendido</Text>
      <View style={styles.productsRow}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.name}
            style={styles.product}
            onPress={() => buyProduct(product)}
          >
            <Image
              style={styles.productImage}
              source={{ uri: product.imageUrl }}
            ></Image>
            <View style={styles.productBody}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productValue}>
                {formatMoney(product.value)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: Colors.white,
    alignSelf: "flex-start",
  },
  subTitle: {
    fontWeight: "400",
    fontSize: 10,
    color: Colors.white,
    alignSelf: "flex-start",
  },
  productsRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  product: {
    width: "48%",
    elevation: 3,
    marginBottom: 8,
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
  },
  productName: {
    color: Colors.dark,
    fontWeight: "700",
    fontSize: 12,
  },
  productBody: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    padding: 8,
  },
  productValue: {
    color: Colors.darkGreen,
    fontWeight: "700",
    fontSize: 10,
  },
});
