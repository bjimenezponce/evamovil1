import React, { useState } from "react";
import {
  IonToast,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  trash,
  addCircleOutline,
  create,
  checkmark,
  flameSharp,
  thumbsDown,
  thumbsUp,
  closeCircleOutline,
} from "ionicons/icons";
import "./Tab1.css";

const MyList: React.FC = () => {
  const [items, setItems] = useState<
    { id: number; name: string; description: string; isEditing: boolean }[]
  >([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Estados para mostrar los toast messages
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const addItem = () => {
    if (name.trim() && description.trim()) {
      const newItem = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        isEditing: false,
      };
      setItems([...items, newItem]);
      setName("");
      setDescription("");
      setShowSuccessToast(true); // Mostrar toast de éxito al agregar
    } else {
      setShowErrorToast(true); // Mostrar toast de error si faltan datos
    }
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    setShowDeleteToast(true); // Mostrar toast al eliminar
  };

  const toggleEdit = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const updateItem = (id: number, newName: string, newDescription: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              name: newName,
              description: newDescription,
              isEditing: false,
            }
          : item
      )
    );
    setShowUpdateToast(true); // Mostrar toast al actualizar
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="page-header">
          <IonTitle>Mi Lista</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Toast Messages */}
        <IonToast
          isOpen={showSuccessToast}
          position="top"
          onDidDismiss={() => setShowSuccessToast(false)}
          message="¡Objeto agregado correctamente!"
          duration={2000}
          color="success"
          icon={flameSharp}
        />
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Por favor, completa todos los campos."
          duration={2000}
          color="danger"
          icon={thumbsDown}
        />
        <IonToast
          isOpen={showUpdateToast}
          onDidDismiss={() => setShowUpdateToast(false)}
          message="Objeto actualizado correctamente."
          duration={2000}
          color="tertiary"
          position="top"
          icon={thumbsUp}
        />
        <IonToast
          isOpen={showDeleteToast}
          onDidDismiss={() => setShowDeleteToast(false)}
          message="Objeto eliminado."
          duration={2000}
          color="warning"
          position="top"
          icon={closeCircleOutline}
        />

        {/* Formulario para agregar un nuevo ítem */}
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonLabel position="floating">Nombre</IonLabel>
                    <br />
                    <IonInput
                      value={name}
                      onIonChange={(e) => setName(e.detail.value!)}
                      placeholder="Agregar objeto"
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonItem>
                    <IonLabel position="floating">Descripción</IonLabel>
                    <br />
                    <IonInput
                      value={description}
                      onIonChange={(e) => setDescription(e.detail.value!)}
                      placeholder="Agregar descripción"
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12" className="ion-text-center">
                  <IonButton
                    color="primary"
                    expand="block"
                    onClick={addItem}
                    className="add-button"
                  >
                    <IonIcon icon={addCircleOutline} slot="start" />
                    Agregar objeto
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Lista de ítems */}
        <IonList>
          {items.map((item) => (
            <IonCard key={item.id} className="card-item">
              <IonCardContent className="card-content">
                <IonItem lines="none">
                  {item.isEditing ? (
                    <>
                      <IonInput
                        value={item.name}
                        placeholder="Edit name"
                        className="edit-input"
                        onIonChange={(e) =>
                          setItems(
                            items.map((i) =>
                              i.id === item.id
                                ? { ...i, name: e.detail.value! }
                                : i
                            )
                          )
                        }
                      />
                      <IonInput
                        value={item.description}
                        placeholder="Edit description"
                        className="edit-input"
                        onIonChange={(e) =>
                          setItems(
                            items.map((i) =>
                              i.id === item.id
                                ? { ...i, description: e.detail.value! }
                                : i
                            )
                          )
                        }
                      />
                      <IonButton
                        color="success"
                        fill="clear"
                        onClick={() =>
                          updateItem(item.id, item.name, item.description)
                        }
                      >
                        <IonIcon icon={checkmark} />
                      </IonButton>
                    </>
                  ) : (
                    <IonLabel className="item-label">
                      <h2 className="item-title">{item.name}</h2>
                      <p className="item-description">{item.description}</p>
                    </IonLabel>
                  )}
                  <IonButton
                    color="primary"
                    fill="clear"
                    onClick={() => toggleEdit(item.id)}
                  >
                    <IonIcon icon={create} />
                  </IonButton>
                  <IonButton
                    color="danger"
                    fill="clear"
                    onClick={() => deleteItem(item.id)}
                  >
                    <IonIcon icon={trash} />
                  </IonButton>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MyList;
