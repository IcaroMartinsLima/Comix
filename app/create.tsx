import { Colors } from "@/constants/colors";
import { formatMoney } from "@/utils/productUtils";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenBackground from "./components/ScreenBackground";

type ProductsTypes = {
  name: string;
  value: number;
  imageUrl: string;
};

const BORDER_RADIUS = 12;

export default function Create() {
  const products: ProductsTypes[] = [
    {
      name: "Notebook",
      value: 2000,
      imageUrl:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    },
    {
      name: "Mouse Gamer",
      value: 150,
      imageUrl:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    },
    {
      name: "Teclado Mecânico",
      value: 350,
      imageUrl:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    },
    {
      name: "Monitor 24 Polegadas",
      value: 900,
      imageUrl:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    },
    {
      name: "Headset Gamer",
      value: 280,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    },
    {
      name: "Cadeira Gamer",
      value: 1200,
      imageUrl:
        "https://listadeouro.com.br/wp-content/uploads/2024/11/Qual-e-a-melhor-cadeira-gamer-para-voce-1.jpg",
    },
    {
      name: "Smartphone",
      value: 2500,
      imageUrl:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    },
    {
      name: "Tablet",
      value: 1800,
      imageUrl:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    },
    {
      name: "Smartwatch",
      value: 700,
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    },
    {
      name: "Caixa de Som Bluetooth",
      value: 320,
      imageUrl:
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400",
    },
  ];
  function buyProduct(product: ProductsTypes) {
    router.push({
      pathname: "/SalesRecord",
      params: {
        name: product.name,
        value: product.value,
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
