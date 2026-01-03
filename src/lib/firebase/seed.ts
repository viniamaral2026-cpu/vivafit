import { db } from './config';
import { collection, doc, setDoc, getDocs, writeBatch, Timestamp } from 'firebase/firestore';
import workouts from './seed-data/workouts.json';
import ads from './seed-data/ads.json';

async function seedDatabase() {
    console.log('Iniciando o processo de semeadura do banco de dados...');

    try {
        // Seed Workouts
        const workoutsCollection = collection(db, 'workouts');
        console.log(`Verificando a coleção 'workouts'...`);
        const workoutsSnapshot = await getDocs(workoutsCollection);
        if (workoutsSnapshot.empty) {
            console.log(`A coleção 'workouts' está vazia. Semeando ${workouts.length} treinos...`);
            const batch = writeBatch(db);
            workouts.forEach((workout) => {
                const docRef = doc(workoutsCollection, workout.id);
                batch.set(docRef, workout);
            });
            await batch.commit();
            console.log('Treinos semeados com sucesso!');
        } else {
            console.log(`A coleção 'workouts' já contém dados. Nenhuma ação necessária.`);
        }

        // Seed Ads
        const adsCollection = collection(db, 'ads');
        console.log(`Verificando a coleção 'ads'...`);
        const adsSnapshot = await getDocs(adsCollection);
        if (adsSnapshot.empty) {
            console.log(`A coleção 'ads' está vazia. Semeando ${ads.length} anúncios...`);
            const batch = writeBatch(db);
            ads.forEach((ad) => {
                const adData = {
                    ...ad,
                    // Garante que a data de expiração seja um objeto Timestamp
                    expiresAt: Timestamp.fromDate(new Date(ad.expiresAt)),
                };
                const docRef = doc(adsCollection, ad.id);
                batch.set(docRef, adData);
            });
            await batch.commit();
            console.log('Anúncios semeados com sucesso!');
        } else {
            console.log(`A coleção 'ads' já contém dados. Nenhuma ação necessária.`);
        }
        
        console.log('\nProcesso de semeadura concluído com sucesso!');
        process.exit(0);

    } catch (error) {
        console.error('Ocorreu um erro durante a semeadura do banco de dados:', error);
        process.exit(1);
    }
}

seedDatabase();
