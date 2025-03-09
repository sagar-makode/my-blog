import Konva from 'konva';  // Add this import to use Konva

const calculateXPos = (text, fontSize, stageWidth, fontFamily) => {
    const tempText = new Konva.Text({
        text: text,
        fontSize: fontSize,
        fontFamily: fontFamily,
    });
    const textWidth = tempText.width();  // Use Konva's width method for accurate text width
    const xPos = (stageWidth - textWidth) / 2;  // Calculate X position to center the text
    return xPos;
};

export default calculateXPos;
