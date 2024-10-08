import cv2
import mediapipe as mp
import numpy as np
import PoseModule as pm

cap = cv2.VideoCapture(0)
detector = pm.poseDetector()
count = 0
direction = 0
form = 0
feedback = "Fix Form"

while cap.isOpened():
    ret, img = cap.read()
    width, height = cap.get(3), cap.get(4)

    img = detector.findPose(img, False)
    lmList = detector.findPosition(img, False)

    if len(lmList) != 0:
        chest = detector.findAngle(img, 12, 24, 26)  # Modify landmarks to chest-hip-knee
        hip = detector.findAngle(img, 24, 26, 28)    # Modify landmarks to hip-knee-ankle

        # Simplify the range and conditions for sit-ups
        per = np.interp(chest, (70, 140), (0, 100))
        bar = np.interp(chest, (70, 140), (380, 50))

        print("Chest:",chest)
        print("hip:",hip)

        # Check proper form before starting
        if chest > 140 and hip > 100:
            form = 1

        # Check for full range of motion for the sit-up
        if form == 1:
            if per == 0:
                if chest <= 150 :
                    feedback = "Up"
                    if direction == 0:
                        count += 0.5
                        direction = 1
                else:
                    feedback = "Fix Form"

            if per == 100:
                if chest > 40 :
                    feedback = "Down"
                    if direction == 1:
                        count += 0.5
                        direction = 0
                else:
                    feedback = "Fix Form"

        print(count)
        
        #Draw Bar
        if form == 1:
            cv2.rectangle(img, (580, 50), (600, 380), (0, 255, 0), 3)
            cv2.rectangle(img, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                        (255, 0, 0), 2)


        #Pushup counter
        cv2.rectangle(img, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                    (255, 0, 0), 5)
        
        #Feedback 
        cv2.rectangle(img, (500, 0), (640, 40), (255, 255, 255), cv2.FILLED)
        cv2.putText(img, feedback, (500, 40 ), cv2.FONT_HERSHEY_PLAIN, 2,
                    (0, 255, 0), 2)

    cv2.imshow('Sit-up Counter', img)

    if count == 10:
        print('Task Complete')

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
        
cap.release()
cv2.destroyAllWindows()
