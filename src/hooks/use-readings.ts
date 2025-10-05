import { useLiveQuery } from "dexie-react-hooks";
import { db, type Reading } from "@/db";
import { toast } from "sonner";

export function useReadings() {
	const data = useLiveQuery(() =>
		db.readings.orderBy("createdAt").reverse().toArray(),
	);

	const createReading = async (reading: Omit<Reading, "id">) => {
		const newId = await db.readings.add(reading);
		return newId;
	};

	const deleteReading = async (readingId: Reading["id"]) => {
		const readingToDelete = await db.readings.get({ id: readingId });

		if (!readingToDelete) {
			console.error(`Could not find reading with id: ${readingId}`);
			return;
		}

		await db.readings.delete(readingId);

		toast(`"${readingToDelete.title}" has been deleted.`, {
			action: {
				label: "Undo",
				onClick: async () => await db.readings.add(readingToDelete),
			},
		});
	};

	const editReading = async (
		reading: Pick<Reading, "id" | "title" | "content">,
		resetProgress: boolean,
	) => {
		const readingToUpdate = await db.readings.get({ id: reading.id });

		if (!readingToUpdate) {
			console.error(`Could not find reading with id: ${reading.id}`);
			return;
		}

		await db.readings.update(reading.id, {
			...reading,
			progress: resetProgress ? 0 : readingToUpdate.progress,
		});

		toast(`"${reading.title}" has been updated.`, {
			action: {
				label: "Undo",
				onClick: async () =>
					await db.readings.update(reading.id, readingToUpdate),
			},
		});
	};

	return {
		data,
		createReading,
		deleteReading,
		editReading,
	};
}
