import { Text, View } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { styles } from './styles';
import { RootStackParamList } from '../../../app-router'; // Importe o RootStackParamList

export function Finish() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use o NavigationProp com RootStackParamList
  const { total, points, userName } = route.params as {
    total: string;
    points: string;
    userName: string;
  };

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        {/* <Stars /> */}
        
        <Text style={styles.title}>
          Parabéns! {/* Exibimos o nome do usuário */}
        </Text>

        <Text style={styles.subtitle}>
          Você acertou {points} de {total} questões
        </Text>
      </View>

      <Button
        title="Ir para o início"
        onPress={() => navigation.navigate('Home')} // Navega para a tela inicial
      />
    </View>
  );
}