import google.generativeai as genai
import base64

# Configura tu clave API
genai.configure(api_key="AIzaSyBzC2MK9T1tdW-bvoKGonO4gD0xjDGeJkw")

# Función para codificar la imagen en Base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
        return encoded_string

# Ruta de la imagen del vehículo
image_path = "path/to/your/vehicle_image.jpg"
base64_image = encode_image(image_path)

# Prepara el prompt con la imagen codificada en Base64
model = genai.GenerativeModel('gemini-pro-vision')
prompt = (
    "Por favor, analiza la siguiente imagen y determina la marca y el modelo del vehículo.\n"
    "Proporciona la información de manera clara y concisa.\n\n"
    f"<image data=\"image/jpeg;base64,{base64_image}\" />"
)

# Genera la respuesta
response = model.generate_content(prompt)

# Procesa la respuesta para extraer la marca y el modelo
if response.text:
    print("\n--- Resultado del análisis ---")
    print(response.text.strip())
    print("------------------------------\n")
else:
    print("\nNo se pudo identificar el vehículo. Por favor, intenta con otra imagen.\n")
